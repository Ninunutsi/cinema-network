import { useRef, useState } from "react";
import type { MovieSearchResult } from "../../../features/movies/movies.types";
import { useDebounce } from "../../../hooks/useDebounce";
import { useMovieSearchQuery } from "../../../features/movies/moviesQueries";
import { SearchPopover } from "../../../components/molecules/SearchPopever";
import { useNavigate } from "react-router-dom";

interface SearchPopoverControllerProps {
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

export const SearchPopoverController = ({
  isSearchOpen,
  setIsSearchOpen,
}: SearchPopoverControllerProps) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query.trim(), 300);
  const anchorRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const {
    data: movies = [],
    isFetching,
    isError,
    refetch,
  } = useMovieSearchQuery(debouncedQuery);

  const isDebouncing = query.trim() !== debouncedQuery;

  const handleMovieSelect = (movie: MovieSearchResult) => {
    setIsSearchOpen(false);
  };

  const handleOpenChange = (
    open: boolean,
    details?: { event?: Event; cancel?: () => void },
  ) => {
    const target = details?.event?.target;

    if (
      !open &&
      target instanceof Node &&
      anchorRef.current?.contains(target)
    ) {
      details?.cancel?.();
      return;
    }

    setIsSearchOpen(open);
  };

  const handleClear = () => {
    setQuery("");
  };

  return (
    <div ref={anchorRef}>
      <SearchPopover
        isOpen={isSearchOpen}
        query={query}
        movies={movies}
        isLoading={isFetching}
        isError={isError}
        isDebouncing={isDebouncing}
        onOpenChange={handleOpenChange}
        onQueryChange={setQuery}
        onRetry={() => void refetch()}
        onClear={handleClear}
        onBrowseSessions={() => {
          navigate("/sessions");
          setIsSearchOpen(false);
        }}
        onMovieSelect={handleMovieSelect}
      />
    </div>
  );
};
