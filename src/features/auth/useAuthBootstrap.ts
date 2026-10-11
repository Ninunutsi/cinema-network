import { useEffect } from "react";
import { useAuthStore } from "./authStore";
import { useCurrentUserQuery } from "./authQueries";
import { setUnauthorizedHandler } from "../../api/httpclient";
import { handleUnauthorizedResponse } from "./utils/auth-guard";
import { useMountEffect } from "../../hooks/useMountEffect";

export function useAuthBootstrap(): void {
  const { data: user } = useCurrentUserQuery();
  const updateUser = useAuthStore((state) => state.updateUser);

  useMountEffect(() => {
    setUnauthorizedHandler(handleUnauthorizedResponse);
    return () => setUnauthorizedHandler(null);
  });

  useEffect(() => {
    if (user) updateUser(user);
  }, [user, updateUser]);
}
