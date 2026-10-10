import { useNavigate } from "react-router-dom";
import { useNowPlayingQuery } from "../../features/movies/useNowPlayingQuery";
import type { LargeMovieData } from "../molecules/MovieCard";
import MovieCard from "../molecules/MovieCard";
import { Button } from "../ui/button";
import { formatRuntime } from "../../features/movies/utils";

const NowPlaying = () => {
  const { data: movies, isPending, isError } = useNowPlayingQuery(8);
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
    <div className="flex flex-col gap-6 px-17.5">
      <div className="flex items-center justify-between">
        <p className="font-sans text-2xl font-extrabold leading-none tracking-normal text-white">
          Now Playing
        </p>

        <Button
          variant="link"
          className="cursor-pointer font-sans text-sm font-semibold leading-none tracking-normal text-danger hover:underline"
        >
          See all
        </Button>
      </div>

      {isPending ? (
        <p className="text-sm text-muted">Loading movies...</p>
      ) : isError ? (
        <p className="text-sm text-muted">
          Could not load movies. Please try again later.
        </p>
      ) : largeMovies.length === 0 ? (
        <p className="text-sm text-muted">No movies currently available.</p>
      ) : (
        <section className="flex gap-4 overflow-x-auto">
          {largeMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onBuyTicket={() => navigate(`/movies/${movie.slug}`)}
            />
          ))}
        </section>
      )}
    </div>
  );
};

export default NowPlaying;
