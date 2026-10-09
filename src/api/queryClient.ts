import { QueryClient } from "@tanstack/react-query";
import { ApiError } from "./errors/ApiError";

const MAX_QUERY_RETRIES = 2;

/** Client errors (4xx) won't fix themselves, so only retry network/server failures. */
function shouldRetryQuery(failureCount: number, error: Error): boolean {
  if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
    return false;
  }
  return failureCount < MAX_QUERY_RETRIES;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
      retry: shouldRetryQuery,
    },
    mutations: {
      retry: false,
    },
  },
});
