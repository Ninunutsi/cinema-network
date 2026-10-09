// import { create } from "zustand";

// type AuthState = {
//   isAuthenticated: boolean;
//   login: () => void;
//   logout: () => void;
// };

// export const useAuthStore = create<AuthState>((set) => ({
//   isAuthenticated: false,

//   login: () => {
//     set({ isAuthenticated: true });
//   },

//   logout: () => {
//     set({ isAuthenticated: false });
//   },
// }));

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthSession, AuthUser } from "../types/auth.types";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  setSession: (session: AuthSession) => void;
  clearSession: () => void;
}

// NOTE: persisting a token in localStorage is simple but exposed to XSS.
// If your backend can issue an httpOnly cookie, prefer that and persist only `user`.
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setSession: ({ user, token }) => set({ user, token }),
      clearSession: () => set({ user: null, token: null }),
    }),
    {
      name: "auth",
      partialize: ({ user, token }) => ({ user, token }),
    },
  ),
);

export const selectIsAuthenticated = (state: AuthState) =>
  Boolean(state.token && state.user);
