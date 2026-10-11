import type {
  ComingSoonMovie,
  MovieDetails,
  NowPlayingMovie,
} from "@/features/movies/movies.types";
import type { LargeMovieData } from "@/components/molecules/MovieCard";
import { formatRuntime } from "@/features/movies/utils";
import type { RecentlyViewedMovie } from "./useRecentlyViewed";

type RecentlyViewedSource =
  | LargeMovieData
  | NowPlayingMovie
  | ComingSoonMovie
  | MovieDetails;

const isApiMovie = (
  movie: RecentlyViewedSource,
): movie is NowPlayingMovie | ComingSoonMovie | MovieDetails =>
  "genres" in movie;

export const toRecentlyViewedMovie = (
  movie: RecentlyViewedSource,
): RecentlyViewedMovie => {
  if (isApiMovie(movie)) {
    return {
      id: movie.id,
      slug: movie.slug,
      title: movie.title,
      genre: movie.genres[0]?.name ?? "Unknown genre",
      duration: formatRuntime(movie.runtimeMinutes),
      ageRating: movie.ageRating.code,
      image: movie.posterUrl,
    };
  }

  return {
    id: movie.id,
    slug: movie.slug,
    title: movie.title,
    genre: movie.genre,
    duration: movie.duration,
    ageRating: movie.ageRating,
    image: movie.image,
  };
};
