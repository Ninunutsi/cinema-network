import { useUrlState } from "../../../hooks/useUrlState";
import { useSessionsQuery } from "../../../features/sessions/sessionsQueries";
import {
  sessionFilterSchema,
  sessionPagingSchema,
} from "../../../features/sessions/seassions.schema";
import { MovieSessionGroup } from "./MovieSessionGroup";
import { SessionsPagination } from "./Sessionspagination";
import { Separator } from "../../../components/ui/separator";

export const SessionsList = () => {
  const { values: filters } = useUrlState(sessionFilterSchema);

  const { values: paging, set: setPaging } = useUrlState(sessionPagingSchema, {
    resetKeys: [],
  });
  const currentPage = Math.max(1, Math.floor(paging.page ?? 1));

  const { data, isPending, isError, isPlaceholderData } = useSessionsQuery({
    ...filters,
    page: currentPage,
  });

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
        <h2 className="text-sm leading-none font-semibold text-white">
          Showing {data.meta.totalSessions} sessions
        </h2>

        <div className="flex flex-col gap-6">
          {data.data.map(({ movie, sessions }, index) => (
            <>
              <MovieSessionGroup
                key={movie.id}
                movie={movie}
                sessions={sessions}
              />
              {index < data.data.length - 1 && (
                <Separator className="bg-background-tint" />
              )}
            </>
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
