import { useComingSoonQuery } from "../../features/movies/useNowPlayingQuery";
import MovieCard from "../molecules/MovieCard";
import { Button } from "../ui/button";

const COMING_SOON_LIMIT = 6;
const SKELETON_COUNT = 3;

const ComingSoon = () => {
  const {
    data: movies,
    isPending,
    isError,
    refetch,
  } = useComingSoonQuery(COMING_SOON_LIMIT);

  if (!isPending && !isError && !movies?.length) return null;

  return (
    <div className="flex flex-col gap-6 px-17.5">
      <div className="flex items-center justify-between">
        <h2 className="font-sans text-2xl font-extrabold leading-none tracking-normal text-white">
          COMING SOON...
        </h2>
        <Button
          variant="link"
          className="cursor-pointer font-sans text-sm font-semibold leading-none tracking-normal text-danger hover:underline"
        >
          See all
        </Button>
      </div>

      <section className=" flex snap-x snap-proximity gap-4 overflow-x-auto scroll-px-17.5  pb-2 [&>*]:shrink-0 [&>*]:snap-start">
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
          <MovieCard
            key={movie.id}
            variant="medium"
            movie={movie}
            onNotify={() => console.log("Notify:", movie.id)}
          />
        ))}
      </section>
    </div>
  );
};

export default ComingSoon;
