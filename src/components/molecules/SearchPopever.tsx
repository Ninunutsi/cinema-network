import { Popcorn, Search, X } from "lucide-react";

import type { MovieSearchResult } from "@/features/movies/movies.types";
import { Input } from "@/components/atoms/Input";
import SearchEmpty from "@/components/atoms/SearchEmpty";
import SearchMovieRow from "@/components/atoms/SearchMovieRow";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface SearchPopoverProps {
  isOpen: boolean;
  query: string;
  movies: MovieSearchResult[];
  isLoading: boolean;
  isError: boolean;
  isDebouncing: boolean;
  onOpenChange: (open: boolean) => void;
  onQueryChange: (query: string) => void;
  onRetry: () => void;
  onClear: () => void;
  onBrowseSessions: () => void;
  onMovieSelect: (movie: MovieSearchResult) => void;
}

export const SearchPopover = ({
  isOpen,
  query,
  movies,
  isLoading,
  isError,
  isDebouncing,
  onOpenChange,
  onQueryChange,
  onRetry,
  onClear,
  onBrowseSessions,
  onMovieSelect,
}: SearchPopoverProps) => {
  const isSearching = isDebouncing || isLoading;

  return (
    <div role="search">
      <Popover open={isOpen} onOpenChange={onOpenChange}>
        <PopoverTrigger>
          <div
            className={`ml-auto shrink-0 overflow-hidden transition-[width] duration-200 ease-out motion-reduce:transition-none ${
              isOpen ? "w-120" : "w-94"
            }`}
          >
            <Input
              type="search"
              aria-label="Search films and live events"
              placeholder="Search films and live events"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  onOpenChange(false);
                  event.currentTarget.blur();
                }
              }}
              endIcon={
                query && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={(event) => {
                      event.stopPropagation();
                      onClear();
                    }}
                    className="pointer-events-auto cursor-pointer size-6 bg-background-tint flex justify-center items-center rounded-full text-white/70 hover:text-white"
                  >
                    <X className="size-2.5" />
                  </button>
                )
              }
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
            isOpen ? "w-120 opacity-100" : "w-94 opacity-0"
          }`}
          style={{
            pointerEvents: isOpen ? "auto" : "none",
          }}
        >
          {isSearching ? (
            <p className="py-8 text-center text-sm text-white font-semibold">
              Searching movies...
            </p>
          ) : isError ? (
            <div className="flex flex-col items-center gap-3 py-8">
              <p className="text-center text-sm text-muted">
                Something went wrong. Please try again.
              </p>

              <button
                type="button"
                onClick={onRetry}
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
              title={`No results for “${query}”`}
              description="Check the spelling or try another film or live event."
              buttonText="Browse all sessions"
              onButtonClick={onBrowseSessions}
            />
          ) : (
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between px-2.5 py-2 select-none">
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
                  onClick={onMovieSelect}
                />
              ))}
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};
