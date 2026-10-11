import { useUrlState } from "../../../hooks/useUrlState";
import {
  useSessionFilterOptionsQuery,
  useSessionsQuery,
} from "../../../features/sessions/sessionsQueries";
import {
  sessionDateSchema,
  sessionFilterSchema,
  sessionPagingSchema,
  sessionSortSchema,
} from "../../../features/sessions/seassions.schema";
import { MovieSessionGroup } from "./MovieSessionGroup";
import { SessionsPagination } from "./Sessionspagination";
import { Separator } from "../../../components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { getNextDates } from "../sessions.utils";
import { Fragment } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";

export const SessionsList = () => {
  const { data: options } = useSessionFilterOptionsQuery();

  const { values: filters } = useUrlState(sessionFilterSchema);
  const { values: sorting, set: setSorting } = useUrlState(sessionSortSchema);
  const { values: paging, set: setPaging } = useUrlState(sessionPagingSchema, {
    resetKeys: [],
  });
  const navigate = useNavigate();

  const currentPage = Math.max(1, Math.floor(paging.page ?? 1));
  // The server defaults to “today”, but its today can differ from mine.
  // So SessionsList should always send the selected date:
  const { values: dateValues } = useUrlState(sessionDateSchema);
  const selectedDate = dateValues.date ?? getNextDates(7)[0];

  const { data, isPending, isError, isPlaceholderData } = useSessionsQuery({
    ...filters,
    date: selectedDate,
    sort: sorting.sort,
    page: currentPage,
  });

  const onMovieClick = (movieSlug: string) => {
    navigate(`/movies/${movieSlug}`);
  };

  const handlePageChange = (page: number) => {
    setPaging("page", page === 1 ? undefined : page);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  if (isPending) {
    return <p className="text-sm text-muted">Loading sessions...</p>;
  }

  if (isError || !data) {
    return <p className="text-sm text-muted">Unable to load sessions.</p>;
  }

  if (data.data.length === 0) {
    return (
      <p className="text-sm text-muted">No sessions match these filters.</p>
    );
  }

  return (
    <div
      className={`flex flex-col gap-13 transition-opacity ${
        isPlaceholderData ? "opacity-60" : "opacity-100"
      }`}
    >
      <div className="flex flex-col gap-6">
        <section className="flex items-center justify-between ">
          <h2 className="text-sm leading-none font-semibold text-white">
            Showing {data.meta.totalSessions} sessions
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm font-regular text-muted">Sort: </span>

            <Select
              value={sorting.sort ?? ""}
              onValueChange={(value) => setSorting("sort", value || undefined)}
            >
              <SelectTrigger className="min-w-30 cursor-pointer border-0 bg-transparent text-sm font-extrabold text-white!">
                <SelectValue placeholder="Sort by...">
                  {
                    options?.sorts.find((sort) => sort.id === sorting.sort)
                      ?.label
                  }
                </SelectValue>
              </SelectTrigger>

              <SelectContent className="min-w-55 bg-background p-2 text-white">
                {options?.sorts.map((sort) => (
                  <SelectItem
                    key={sort.id}
                    value={sort.id}
                    className="cursor-pointer"
                  >
                    {sort.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </section>

        <div className="flex flex-col gap-6">
          {data.data.map(({ movie, sessions }, index) => (
            <Fragment key={movie.id}>
              <MovieSessionGroup
                key={movie.id}
                movie={movie}
                sessions={sessions}
                onMovieClick={() => onMovieClick(movie.slug)}
              />
              {index < data.data.length - 1 && (
                <Separator className="bg-background-tint" />
              )}
            </Fragment>
          ))}
        </div>
      </div>

      <SessionsPagination
        currentPage={data.meta.currentPage}
        lastPage={data.meta.lastPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
