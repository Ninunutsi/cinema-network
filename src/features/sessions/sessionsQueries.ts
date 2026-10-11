import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { sessionsApi } from "./sessionsApi";
import type { SessionsParams } from "./sessions.types";

export const sessionKeys = {
  all: ["sessions"] as const,
  filterOptions: () => [...sessionKeys.all, "filter-options"] as const,
  list: (params: SessionsParams) =>
    [...sessionKeys.all, "list", params] as const,
  detail: (sessionId: number) =>
    [...sessionKeys.all, "detail", sessionId] as const,
  seatMap: (sessionId: number) =>
    [...sessionKeys.all, "seat-map", sessionId] as const,
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
    placeholderData: keepPreviousData,
  });
}

export function useSessionQuery(sessionId: number) {
  return useQuery({
    queryKey: sessionKeys.detail(sessionId),
    queryFn: () => sessionsApi.getSession(sessionId),
    enabled: Number.isInteger(sessionId) && sessionId > 0,
  });
}

export function useSessionSeatMapQuery(sessionId: number, enabled = true) {
  return useQuery({
    queryKey: sessionKeys.seatMap(sessionId),
    queryFn: () => sessionsApi.getSeatMap(sessionId),
    enabled: enabled && Number.isInteger(sessionId) && sessionId > 0,
  });
}
