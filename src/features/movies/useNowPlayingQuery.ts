import { useQuery } from "@tanstack/react-query";
import { moviesApi } from "./moviesApi";

export const movieKeys = {
  all: ["movies"] as const,
  nowPlaying: (limit?: number) =>
    [...movieKeys.all, "now-playing", limit ?? "all"] as const,
};

export function useNowPlayingQuery(limit?: number) {
  return useQuery({
    queryKey: movieKeys.nowPlaying(limit),
    queryFn: () => moviesApi.getNowPlaying(limit),
  });
}
