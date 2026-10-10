import { Popcorn, Search } from "lucide-react";
import { useState } from "react";

import { useDebounce } from "../../hooks/useDebounce";

import type { MovieSearchResult } from "../../features/movies/movies.types";
import { Input } from "../atoms/Input";
import SearchEmpty from "../atoms/SearchEmpty";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useMovieSearchQuery } from "../../features/movies/useNowPlayingQuery";

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
  } = useMovieSearchQuery(debouncedQuery);

  const isDebouncing = query.trim() !== debouncedQuery;

  const handleMovieSelect = (movie: MovieSearchResult) => {
    onMovieSelect(movie);
    setIsSearchOpen(false);
  };

  const handleClearSearch = () => {
    setQuery("");
  };

  return (
    <div role="search">
      <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <PopoverTrigger>
          <div
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
                onClick={() => setQuery((current) => current + " ")}
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
              {movies.slice(0, 6).map((movie) => (
                <button
                  key={movie.id}
                  type="button"
                  onClick={() => handleMovieSelect(movie)}
                  className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-background-tint"
                >
                  <img
                    src={movie.posterUrl}
                    alt=""
                    className="h-16 w-11 shrink-0 rounded-md object-cover"
                  />

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-white">
                      {movie.title}
                    </span>
                    <span className="mt-1 block text-xs capitalize text-muted">
                      {movie.kind.replace(/_/g, " ")}
                      {movie.releaseDate
                        ? ` · ${movie.releaseDate.slice(0, 4)}`
                        : ""}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};
