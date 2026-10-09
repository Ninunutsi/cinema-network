import axios, { type AxiosRequestConfig } from "axios";

import { useAuthStore } from "../features/auth/store/authStore";

import { env } from "../config/env";
import { toApiError } from "./errors/ApiError";

/**
 * What to do when the server answers 401:
 * - "prompt": the token is gone or expired. Ask the user to log in, then replay
 *   the request so they don't have to repeat what they were doing. (default)
 * - "throw":  surface the error to the caller. Use for endpoints where 401 has
 *   its own meaning: wrong credentials on login, a stale token on /me, logout.
 */
export type UnauthorizedStrategy = "prompt" | "throw";

declare module "axios" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface AxiosRequestConfig<D = any> {
    unauthorized?: UnauthorizedStrategy;
    /** Set on the replayed request so a second 401 can't loop. */
    isReplay?: boolean;
  }
}

/**
 * Resolves true once the user has a valid session again (the request is then
 * replayed) and false if they dismissed the login. Registered at app boot so
 * this module stays free of UI dependencies.
 */
type UnauthorizedHandler = (staleToken: string | null) => Promise<boolean>;

let unauthorizedHandler: UnauthorizedHandler | null = null;

export function setUnauthorizedHandler(handler: UnauthorizedHandler | null) {
  unauthorizedHandler = handler;
}

function readBearerToken(config: AxiosRequestConfig): string | null {
  const header: unknown = config.headers?.Authorization;
  return typeof header === "string" ? header.replace(/^Bearer /, "") : null;
}

export const httpClient = axios.create({
  baseURL: env.apiUrl,
  headers: { Accept: "application/json" },
});

httpClient.interceptors.request.use((config) => {
  // Read per request so a replay after re-login picks up the new token.
  const { token } = useAuthStore.getState();
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  } else {
    config.headers.delete("Authorization");
  }
  return config;
});

httpClient.interceptors.response.use(undefined, async (error: unknown) => {
  if (axios.isCancel(error)) throw error;

  if (
    axios.isAxiosError(error) &&
    error.response?.status === 401 &&
    error.config &&
    !error.config.isReplay &&
    (error.config.unauthorized ?? "prompt") === "prompt" &&
    unauthorizedHandler
  ) {
    const reauthenticated = await unauthorizedHandler(
      readBearerToken(error.config),
    );
    if (reauthenticated) {
      return httpClient.request({ ...error.config, isReplay: true });
    }
  }

  throw toApiError(error);
});
