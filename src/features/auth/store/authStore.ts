import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthSession, AuthUser } from "../types/types";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  setSession: (session: AuthSession) => void;
  updateUser: (user: AuthUser) => void;
  clearSession: () => void;
}

// NOTE: persisting a token in localStorage is simple but exposed to XSS.
// The API returns a bearer token, so this is the pragmatic choice here.
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setSession: ({ user, token }) => set({ user, token }),
      updateUser: (user) => set({ user }),
      clearSession: () => set({ user: null, token: null }),
    }),
    {
      name: "auth",
      partialize: ({ user, token }) => ({ user, token }),
    },
  ),
);

export const selectIsAuthenticated = (state: AuthState) =>
  state.token !== null && state.user !== null;

export const selectIsProfileComplete = (state: AuthState) =>
  state.user?.profileComplete === true;
