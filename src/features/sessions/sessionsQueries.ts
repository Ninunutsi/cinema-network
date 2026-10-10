import { useQuery } from "@tanstack/react-query";
import { sessionsApi } from "./sessionsApi";
import type { SessionsParams } from "./sessions.types";

export const sessionKeys = {
  all: ["sessions"] as const,
  filterOptions: () => [...sessionKeys.all, "filter-options"] as const,
  list: (params: SessionsParams) =>
    [...sessionKeys.all, "list", params] as const,
};

export function useSessionFilterOptionsQuery() {
  return useQuery({
    queryKey: sessionKeys.filterOptions(),
    queryFn: sessionsApi.getFilterOptions,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

export function useSessionsQuery(params: SessionsParams) {
  return useQuery({
    queryKey: sessionKeys.list(params),
    queryFn: () => sessionsApi.getSessions(params),
  });
}
