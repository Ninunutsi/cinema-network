import type { MovieSearchResult } from "../../features/movies/movies.types";
import { Button } from "../ui/button";

interface SearchMovieRowProps {
  movie: MovieSearchResult;
  onClick: (movie: MovieSearchResult) => void;
}

const SearchMovieRow = ({ movie, onClick }: SearchMovieRowProps) => {
  return (
    <Button
      variant="ghost"
      type="button"
      onClick={() => onClick(movie)}
      className="flex cursor-pointer h-auto w-full items-center justify-start gap-3 rounded-lg p-2 text-left transition-colors hover:bg-background-tint"
    >
      <img
        src={movie.posterUrl}
        alt=""
        className="h-14 w-10 shrink-0 rounded-md object-cover"
      />

      <div className="flex items-center justify-between w-full">
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-muted">
            {movie.title}
          </span>

          <span className="mt-1 block text-xs capitalize text-muted">
            {movie.kind.replace(/_/g, " ")}
            {movie.releaseDate && ` · ${movie.releaseDate.slice(0, 4)}`}
          </span>
        </span>
        {movie.isComingSoon ? (
          <span className="text-sm font-semibold leading-none tracking-normal text-danger">
            Coming Soon
          </span>
        ) : (
          <span className="text-sm font-semibold leading-none tracking-normal text-white">
            from ₾{movie.fromPrice}
          </span>
        )}
      </div>
    </Button>
  );
};

export default SearchMovieRow;
