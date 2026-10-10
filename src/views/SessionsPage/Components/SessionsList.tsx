import { useUrlState } from "../../../hooks/useUrlState";
import { useSessionsQuery } from "../../../features/sessions/sessionsQueries";
import { sessionFilterSchema } from "../../../features/sessions/seassions.schema";
import { MovieSessionGroup } from "./MovieSessionGroup";

export const SessionsList = () => {
  const { values } = useUrlState(sessionFilterSchema);
  const { data, isPending, isError, isPlaceholderData } =
    useSessionsQuery(values);

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
      <h2 className="text-sm leading-none font-semibold text-white">
        Showing {data.meta.totalSessions} sessions
      </h2>

      <div className="flex flex-col gap-6">
        {data.data.map(({ movie, sessions }) => (
          <MovieSessionGroup key={movie.id} movie={movie} sessions={sessions} />
        ))}
      </div>
    </div>
  );
};
