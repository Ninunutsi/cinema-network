import { useModalStore } from "../../../store/modalStore";
import {
  selectIsAuthenticated,
  selectIsProfileComplete,
  useAuthStore,
} from "../store/authStore";
import { openModal } from "../../../utils/modals/modalActions";
import type { AuthMode } from "../types/types";

const AUTH_MODAL_KEY = "AuthModal";
// TODO: make sure a modal is registered under this key in ModalRegistry.
const PROFILE_MODAL_KEY = "profile";

export const PROFILE_INCOMPLETE_MESSAGE =
  "Please complete your profile before booking tickets.";

type GuardedAction = () => void | Promise<void>;

export function isAuthenticated(): boolean {
  return selectIsAuthenticated(useAuthStore.getState());
}

export function openAuthModal(mode: AuthMode = "login"): void {
  openModal(AUTH_MODAL_KEY, { mode });
}

function isAuthModalOpen(): boolean {
  return useModalStore
    .getState()
    .stack.some((entry) => entry.key === AUTH_MODAL_KEY);
}

// Shared by every caller that needs a login at the same moment (for example
// several requests failing with 401 together), so only one modal opens.
let loginPrompt: Promise<boolean> | null = null;

/**
 * Opens the login modal and resolves once it is gone: true if the user ended up
 * authenticated, false if they dismissed it. Switching between the login and
 * sign-up modals keeps the prompt pending, because the next modal is opened
 * before the current one closes.
 */
export function promptLogin(): Promise<boolean> {
  if (loginPrompt) return loginPrompt;

  if (!isAuthModalOpen()) openAuthModal("login");

  loginPrompt = new Promise<boolean>((resolve) => {
    const unsubscribe = useModalStore.subscribe(() => {
      if (isAuthModalOpen()) return;
      unsubscribe();
      loginPrompt = null;
      resolve(isAuthenticated());
    });
  });

  return loginPrompt;
}

async function ensureAuthenticated(): Promise<boolean> {
  return isAuthenticated() || promptLogin();
}

/**
 * Runs `action` if the user is logged in. Otherwise opens the login modal and
 * runs `action` once they authenticate, so they never have to click twice.
 *
 * @returns whether the action ran.
 *
 * @example
 * <Button onClick={() => requireAuth(() => navigate("/my-tickets"))}>My Tickets</Button>
 */
export async function requireAuth(action: GuardedAction): Promise<boolean> {
  if (!(await ensureAuthenticated())) return false;
  await action();
  return true;
}

/**
 * Like `requireAuth`, but for actions that need a completed profile (booking).
 * New accounts start with `profileComplete: false`, so after registering the
 * user is pointed at the profile form instead of the action.
 *
 * @returns whether the action ran.
 */
export async function requireCompleteProfile(
  action: GuardedAction,
): Promise<boolean> {
  if (!(await ensureAuthenticated())) return false;

  if (!selectIsProfileComplete(useAuthStore.getState())) {
    openModal(PROFILE_MODAL_KEY, { message: PROFILE_INCOMPLETE_MESSAGE });
    return false;
  }

  await action();
  return true;
}

/**
 * Called by the HTTP client when a request comes back 401 (token missing or
 * expired). Drops the dead session, asks for a login, and tells the client
 * whether it can replay the request.
 */
export async function handleUnauthorizedResponse(
  staleToken: string | null,
): Promise<boolean> {
  const { token, clearSession } = useAuthStore.getState();

  // Another request already re-authenticated while this one was in flight.
  if (token !== staleToken && isAuthenticated()) return true;

  if (token === staleToken) clearSession();
  return promptLogin();
}
