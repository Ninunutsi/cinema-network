import { useEffect } from "react";
import { useAuthStore } from "./authStore";
import { useCurrentUserQuery } from "../../api/queries/auth-queries";
import { setUnauthorizedHandler } from "../../api/httpclient";
import { handleUnauthorizedResponse } from "./utils/auth-guard";

/**
 * Mount once, inside the QueryClientProvider:
 * - wires the HTTP client's 401 handling to the login modal
 * - restores the session on boot and keeps `profileComplete` fresh
 */
export function useAuthBootstrap(): void {
  const { data: user } = useCurrentUserQuery();
  const updateUser = useAuthStore((state) => state.updateUser);

  useEffect(() => {
    setUnauthorizedHandler(handleUnauthorizedResponse);
    return () => setUnauthorizedHandler(null);
  }, []);

  useEffect(() => {
    if (user) updateUser(user);
  }, [user, updateUser]);
}
