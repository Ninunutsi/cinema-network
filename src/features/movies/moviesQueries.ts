import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { moviesApi } from "./moviesApi";
import { toast } from "sonner";

const movieKeys = {
  all: ["movies"] as const,
  nowPlaying: (limit?: number) =>
    [...movieKeys.all, "now-playing", limit ?? "all"] as const,
  featured: () => [...movieKeys.all, "featured"] as const,
  comingSoon: (limit?: number) =>
    [...movieKeys.all, "coming-soon", limit ?? "all"] as const,
  search: (query: string) => [...movieKeys.all, "search", query] as const,
  detail: (movie: string) => [...movieKeys.all, movie] as const,
  sessions: (movie: string, date: string) =>
    [...movieKeys.all, "sessions", movie, date] as const,
  notification: (movie: string) =>
    [...movieKeys.all, "notification", movie] as const,
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
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });
}

export const useMovieDetailsQuery = (movie: string | undefined) => {
  return useQuery({
    queryKey: movieKeys.detail(movie ?? ""),
    queryFn: () => moviesApi.getMovieDetails(movie!),
    enabled: Boolean(movie),
    staleTime: 60_000,
  });
};

export function useMovieSessionsQuery(movie: string | undefined, date: string) {
  return useQuery({
    queryKey: movieKeys.sessions(movie ?? "", date),
    queryFn: () => moviesApi.getMovieSessions(movie!, date),
    enabled: Boolean(movie && date),
    staleTime: 60_000,
  });
}

export function useNotifyMovieMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: movieKeys.notification(""),
    mutationFn: (movie: string) => moviesApi.notify(movie),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...movieKeys.all, "coming-soon"],
      });
      toast.success("We'll notify you when it's released.");
    },
  });
}
