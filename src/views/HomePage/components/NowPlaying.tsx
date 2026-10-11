import { useNavigate } from "react-router-dom";

import MovieCard, {
  type LargeMovieData,
} from "@/components/molecules/MovieCard";
import MovieSection from "@/components/molecules/MovieSection";
import { useNowPlayingQuery } from "@/features/movies/moviesQueries";
import { formatRuntime } from "@/features/movies/utils";

const NOW_PLAYING_LIMIT = 8;
const SKELETON_COUNT = 6;

const NowPlaying = () => {
  const {
    data: movies,
    isPending,
    isError,
  } = useNowPlayingQuery(NOW_PLAYING_LIMIT);
  const navigate = useNavigate();

  const largeMovies: LargeMovieData[] = (movies ?? []).map((movie) => ({
    id: movie.id,
    slug: movie.slug,
    title: movie.title,
    genre: movie.genres.map((genre) => genre.name).join(", "),
    duration: formatRuntime(movie.runtimeMinutes),
    ageRating: movie.ageRating.code,
    image: movie.posterUrl,
    price: `₾${movie.fromPrice}`,
    synopsis: movie.synopsis,
  }));

  return (
    <MovieSection
      title="Now Playing"
      handleSeeAll={() => navigate("/sessions")}
    >
      {isPending ? (
        <section
          aria-label="Loading movies"
          aria-busy="true"
          className="flex gap-4 overflow-x-auto"
        >
          {Array.from({ length: SKELETON_COUNT }, (_, i) => (
            <div
              key={i}
              aria-hidden="true"
              className="h-100 w-70 shrink-0 animate-pulse rounded-2xl bg-background-tint"
            />
          ))}
        </section>
      ) : isError ? (
        <p className="text-sm text-muted">
          Could not load movies. Please try again later.
        </p>
      ) : largeMovies.length === 0 ? (
        <p className="text-sm text-muted">No movies currently available.</p>
      ) : (
        <section className="flex gap-4 overflow-x-auto pr-20">
          {largeMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onBuyTicket={() => {
                navigate(`/movies/${movie.slug}`);
              }}
            />
          ))}
        </section>
      )}
    </MovieSection>
  );
};

export default NowPlaying;
