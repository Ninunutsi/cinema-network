import { useUrlState } from "../../../hooks/useUrlState";
import { useSessionsQuery } from "../../../features/sessions/sessionsQueries";
import { sessionFilterSchema } from "../../../features/sessions/seassions.schema";

export const SessionsList = () => {
  const { values } = useUrlState(sessionFilterSchema);
  const { data, isPending, isError, isPlaceholderData } =
    useSessionsQuery(values);

  console.log(data);

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
    <div className={isPlaceholderData ? "opacity-60 transition-opacity" : ""}>
      {data.data.map(({ movie, sessions }) => (
        <article key={movie.id} className="text-white border border-white">
          <h4>{movie.title}</h4>
          <p>{sessions.length} sessions</p>
        </article>
      ))}
    </div>
  );
};
