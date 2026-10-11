import { useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"; // NEW
import { ApiError } from "../../api/errors/ApiError";
import type { AuthSession, AuthUser } from "./types";
import { authApi } from "./authApi";
import { useAuthStore } from "./authStore";
import { ticketKeys } from "../tickets/ticketsQueries";

export const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
};

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
    onSuccess: (session) => {
      startSession(session);
      toast.success("Logged In Successfully!");
    },
    meta: { silent: true },
  });
}

export function useSignUpMutation() {
  const startSession = useStartSession();

  return useMutation({
    mutationFn: authApi.signUp,
    onSuccess: (session) => {
      startSession(session);
      toast.success("Account created. Welcome!");
    },
    meta: { silent: true },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const clearSession = useAuthStore((state) => state.clearSession);

  return useMutation({
    mutationFn: authApi.logout,
    meta: { silent: true },
    onSettled: async () => {
      await queryClient.cancelQueries({ queryKey: authKeys.me() });
      await queryClient.cancelQueries({ queryKey: ticketKeys.all });
      clearSession();
      queryClient.setQueryData(authKeys.me(), null);
      queryClient.removeQueries({ queryKey: ticketKeys.all });
      toast.success("You've been logged out."); // NEW
    },
  });
}
