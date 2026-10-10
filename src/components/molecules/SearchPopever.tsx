import { Popcorn, Search } from "lucide-react";
import { useRef, useState } from "react";

import { useDebounce } from "../../hooks/useDebounce";

import type { MovieSearchResult } from "../../features/movies/movies.types";
import { Input } from "../atoms/Input";
import SearchEmpty from "../atoms/SearchEmpty";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useMovieSearchQuery } from "../../features/movies/useNowPlayingQuery";
import SearchMovieRow from "../atoms/SearchMovieRow";

interface SearchPopoverProps {
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  onBrowseSessions: () => void;
  onMovieSelect: (movie: MovieSearchResult) => void;
}

export const SearchPopover = ({
  isSearchOpen,
  setIsSearchOpen,
  onBrowseSessions,
  onMovieSelect,
}: SearchPopoverProps) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query.trim(), 300);

  const {
    data: movies = [],
    isFetching,
    isError,
    refetch,
  } = useMovieSearchQuery(debouncedQuery);

  const isDebouncing = query.trim() !== debouncedQuery;

  const handleMovieSelect = (movie: MovieSearchResult) => {
    onMovieSelect(movie);
    setIsSearchOpen(false);
  };

  const handleClearSearch = () => {
    setQuery("");
  };
  const anchorRef = useRef<HTMLDivElement>(null);

  return (
    <div role="search">
      <Popover
        open={isSearchOpen}
        onOpenChange={(open, details) => {
          const target = details.event?.target as Node | null | undefined;
          console.log(target);
          if (!open && target && anchorRef.current?.contains(target)) {
            details.cancel();
            return;
          }
          setIsSearchOpen(open);
        }}
      >
        <PopoverTrigger>
          <div
            ref={anchorRef}
            className={`ml-auto shrink-0 overflow-hidden transition-[width] duration-200 ease-out motion-reduce:transition-none ${
              isSearchOpen ? "w-120" : "w-94"
            }`}
          >
            <Input
              type="search"
              aria-label="Search films and live events"
              placeholder="Search films and live events"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setIsSearchOpen(false);
                  event.currentTarget.blur();
                }
              }}
              className="bg-background-tint text-white placeholder:text-white"
              startIcon={<Search className="size-4 text-white" />}
            />
          </div>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          side="bottom"
          sideOffset={7}
          initialFocus={false}
          finalFocus={false}
          className={`border border-background-tint bg-background p-2 transition-[width,opacity] duration-300 ease-out ${
            isSearchOpen ? "w-120 opacity-100" : "w-94 opacity-0"
          }`}
          style={{
            pointerEvents: isSearchOpen ? "auto" : "none",
          }}
        >
          {isDebouncing || isFetching ? (
            <p className="py-8 text-center text-sm text-muted">
              Searching movies...
            </p>
          ) : isError ? (
            <div className="flex flex-col items-center gap-3 py-8">
              <p className="text-center text-sm text-muted">
                Something went wrong. Please try again.
              </p>
              <button
                type="button"
                onClick={() => void refetch()}
                className="text-sm font-semibold text-white underline"
              >
                Retry
              </button>
            </div>
          ) : query.trim() === "" ? (
            <SearchEmpty
              icon={Popcorn}
              title="What do you want to watch?"
              description="Search by title, director or cast"
              buttonText="Browse all sessions"
              onButtonClick={onBrowseSessions}
            />
          ) : movies.length === 0 ? (
            <SearchEmpty
              icon={Search}
              title="No movies found"
              description="Try searching for another movie title"
              buttonText="Clear search"
              onButtonClick={handleClearSearch}
            />
          ) : (
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center px-2.5 py-2 select-none">
                <p className="text-xs font-semibold uppercase leading-none tracking-[0.06em] text-muted">
                  FILMS & EVENTS
                </p>
                <span className="text-xs font-normal leading-[130%] tracking-normal text-muted">
                  {movies.length} results
                </span>
              </div>
              {movies.map((movie) => (
                <SearchMovieRow
                  key={movie.id}
                  movie={movie}
                  onClick={handleMovieSelect}
                />
              ))}
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};
