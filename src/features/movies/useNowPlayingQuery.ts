import { useQuery } from "@tanstack/react-query";
import { moviesApi } from "./moviesApi";

export const movieKeys = {
  all: ["movies"] as const,
  nowPlaying: (limit?: number) =>
    [...movieKeys.all, "now-playing", limit ?? "all"] as const,
  featured: () => [...movieKeys.all, "featured"] as const,
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
