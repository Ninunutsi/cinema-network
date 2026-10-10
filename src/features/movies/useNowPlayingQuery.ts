import { useQuery } from "@tanstack/react-query";
import { moviesApi } from "./moviesApi";

export const movieKeys = {
  all: ["movies"] as const,
  nowPlaying: (limit?: number) =>
    [...movieKeys.all, "now-playing", limit ?? "all"] as const,
  featured: () => [...movieKeys.all, "featured"] as const,
  comingSoon: (limit?: number) =>
    [...movieKeys.all, "coming-soon", limit ?? "all"] as const,
  search: (query: string) => [...movieKeys.all, "search", query] as const,
};

export function useNowPlayingQuery(limit?: number) {
  return useQuery({
    queryKey: movieKeys.nowPlaying(limit),
    queryFn: () => moviesApi.getNowPlaying(limit),
  });
}

export function useFeaturedQuery() {
  return useQuery({
    queryKey: movieKeys.featured(),
    queryFn: moviesApi.getFeatured,
    staleTime: 5 * 60 * 1000,
  });
}

export function useComingSoonQuery(limit?: number) {
  return useQuery({
    queryKey: movieKeys.comingSoon(limit),
    queryFn: () => moviesApi.getComingSoon(limit),
    staleTime: 5 * 60 * 1000,
  });
}

export function useMovieSearchQuery(query: string) {
  return useQuery({
    queryKey: movieKeys.search(query),
    queryFn: () => moviesApi.search(query),
    enabled: query.trim().length > 0,
    staleTime: 60 * 1000,
  });
}
