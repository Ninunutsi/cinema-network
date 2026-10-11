import { useModalStore } from "../../../store/modalStore";
import { selectIsAuthenticated, useAuthStore } from "../authStore";
import { openModal } from "../../../utils/modals/modalActions";
import type { AuthMode } from "../types";

const AUTH_MODAL_KEY = "AuthModal";

function isAuthenticated(): boolean {
  return selectIsAuthenticated(useAuthStore.getState());
}

function openAuthModal(mode: AuthMode = "login"): void {
  openModal(AUTH_MODAL_KEY, { mode });
}

function isAuthModalOpen(): boolean {
  return useModalStore
    .getState()
    .stack.some((entry) => entry.key === AUTH_MODAL_KEY);
}
let loginPrompt: Promise<boolean> | null = null;
function promptLogin(): Promise<boolean> {
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

export async function handleUnauthorizedResponse(
  staleToken: string | null,
): Promise<boolean> {
  const { token, clearSession } = useAuthStore.getState();

  if (token !== staleToken && isAuthenticated()) return true;

  if (token === staleToken) clearSession();
  return promptLogin();
}
