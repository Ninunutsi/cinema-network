import { selectIsAuthenticated, useAuthStore } from "../store/authStore";
import type { AuthMode } from "../types/auth.types";
import { openModal } from "./modals/modalActions";

type PendingAction = () => void;

// An action the user tried to perform while logged out. It runs once after a
// successful login/sign-up and is discarded if the modal is dismissed.
let pendingAction: PendingAction | null = null;

export function isAuthenticated(): boolean {
  return selectIsAuthenticated(useAuthStore.getState());
}

export function openAuthModal(mode: AuthMode = "login"): void {
  openModal("AuthModal", { mode });
}

/**
 * Runs `action` immediately if the user is logged in; otherwise opens the login
 * modal and runs `action` after they authenticate.
 *
 * @returns true if the action ran immediately, false if login was required.
 *
 * Works outside React too, e.g. from an API client reacting to a 401.
 *
 * @example
 * <Button onClick={() => requireAuth(() => navigate("/profile"))}>Profile</Button>
 */
export function requireAuth(action: PendingAction): boolean {
  if (isAuthenticated()) {
    action();
    return true;
  }
  pendingAction = action;
  openAuthModal("login");
  return false;
}

export function runPendingAuthAction(): void {
  const action = pendingAction;
  pendingAction = null;
  action?.();
}

export function clearPendingAuthAction(): void {
  pendingAction = null;
}
