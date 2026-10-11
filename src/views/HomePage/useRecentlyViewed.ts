import { useCallback } from "react";
import type { SmallMovieData } from "@/components/molecules/MovieCard";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const RECENTLY_VIEWED_KEY = "recently-viewed-movies";
const MAX_RECENTLY_VIEWED = 10;

export interface RecentlyViewedMovie extends SmallMovieData {
  id: number;
  slug: string;
}

export const useRecentlyViewed = () => {
  const [movies, setMovies] = useLocalStorage<RecentlyViewedMovie[]>(
    RECENTLY_VIEWED_KEY,
    [],
  );

  const addMovie = useCallback(
    (movie: RecentlyViewedMovie) => {
      setMovies((previous) =>
        [movie, ...previous.filter((item) => item.id !== movie.id)].slice(
          0,
          MAX_RECENTLY_VIEWED,
        ),
      );
    },
    [setMovies],
  );

  const clearMovies = useCallback(() => {
    setMovies([]);
  }, [setMovies]);

  return {
    movies,
    addMovie,
    clearMovies,
  };
};
