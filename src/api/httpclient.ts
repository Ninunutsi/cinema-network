import axios, { type AxiosRequestConfig } from "axios";

import { env } from "../config/env";
import { toApiError } from "./errors/ApiError";
import { useAuthStore } from "../features/auth/authStore";

export type UnauthorizedStrategy = "prompt" | "throw";

declare module "axios" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface AxiosRequestConfig<D = any> {
    unauthorized?: UnauthorizedStrategy;
    isReplay?: boolean;
  }
}

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
