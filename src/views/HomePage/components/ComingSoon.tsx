import { Link, useNavigate } from "react-router-dom";
import MovieCard from "../../../components/molecules/MovieCard";
import MovieSection from "../../../components/molecules/MovieSection";

import { Button } from "../../../components/ui/button";
import {
  useComingSoonQuery,
  useNotifyMovieMutation,
} from "../../../features/movies/moviesQueries";

const COMING_SOON_LIMIT = 6;
const SKELETON_COUNT = 3;

const ComingSoon = () => {
  const {
    data: movies,
    isPending,
    isError,
    refetch,
  } = useComingSoonQuery(COMING_SOON_LIMIT);
  const { mutate: notifyMovie } = useNotifyMovieMutation();
  const navigate = useNavigate();

  if (!isPending && !isError && !movies?.length) return null;

  return (
    <MovieSection
      title="COMING SOON..."
      handleSeeAll={() => navigate("/sessions")}
    >
      <section className="flex snap-x snap-proximity gap-4 overflow-x-auto scroll-px-17.5 pb-2 pr-19 [&>*]:shrink-0 [&>*]:snap-start">
        {isPending &&
          Array.from({ length: SKELETON_COUNT }, (_, i) => (
            <div
              key={i}
              aria-hidden="true"
              className="h-40 w-117.5 animate-pulse rounded-2xl bg-background-tint"
            />
          ))}

        {isError && (
          <div className="flex items-center gap-4 text-sm text-muted">
            <p>Couldn't load upcoming movies.</p>
            <Button
              variant="outline"
              onClick={() => refetch()}
              className="h-auto cursor-pointer rounded-full bg-transparent px-3 py-1.5 text-xs text-white hover:bg-transparent"
            >
              Retry
            </Button>
          </div>
        )}

        {movies?.map((movie) => (
          <Link
            key={movie.id}
            to={`/movies/${movie.slug}`}
            className="shrink-0"
            aria-label={`View details for ${movie.title}`}
          >
            <MovieCard
              key={movie.id}
              variant="medium"
              movie={movie}
              onNotify={() => notifyMovie(movie.slug)}
            />
          </Link>
        ))}
      </section>
    </MovieSection>
  );
};

export default ComingSoon;
