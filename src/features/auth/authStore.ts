import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthSession, AuthUser } from "./types";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  setSession: (session: AuthSession) => void;
  updateUser: (user: AuthUser) => void;
  clearSession: () => void;
}

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
