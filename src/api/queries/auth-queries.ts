import { useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ApiError } from "../errors/ApiError";
import type { AuthSession, AuthUser } from "../../features/auth/types";
import { authApi } from "../../features/auth/authApi";
import { useAuthStore } from "../../features/auth/authStore";

export const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
};

/** A stale token (401) is not an error here: the user simply becomes a guest. */
async function fetchCurrentUserOrGuest(): Promise<AuthUser | null> {
  try {
    return await authApi.me();
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      useAuthStore.getState().clearSession();
      return null;
    }
    throw error;
  }
}

/** Refreshes the stored user (including `profileComplete`) when a token exists. */
export function useCurrentUserQuery() {
  const hasToken = useAuthStore((state) => state.token !== null);

  return useQuery({
    queryKey: authKeys.me(),
    queryFn: fetchCurrentUserOrGuest,
    enabled: hasToken,
  });
}

function useStartSession() {
  const queryClient = useQueryClient();
  const setSession = useAuthStore((state) => state.setSession);

  return useCallback(
    (session: AuthSession) => {
      setSession(session);
      queryClient.setQueryData(authKeys.me(), session.user);
    },
    [queryClient, setSession],
  );
}

export function useLoginMutation() {
  const startSession = useStartSession();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: startSession,
  });
}

export function useSignUpMutation() {
  const startSession = useStartSession();

  return useMutation({
    mutationFn: authApi.signUp,
    onSuccess: startSession,
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const clearSession = useAuthStore((state) => state.clearSession);

  return useMutation({
    mutationFn: authApi.logout,
    // The token must be dropped whether or not the server call succeeded.
    onSettled: () => {
      clearSession();
      queryClient.clear();
    },
  });
}
