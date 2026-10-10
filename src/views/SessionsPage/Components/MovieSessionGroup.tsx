import { Badge } from "../../../components/ui/badge";
import type { MovieSessionsGroup } from "../../../features/sessions/sessions.types";
import { SessionCard } from "./SessionCard";

interface MovieSessionGroupProps {
  movie: MovieSessionsGroup["movie"];
  sessions: MovieSessionsGroup["sessions"];
}

export const MovieSessionGroup = ({
  movie,
  sessions,
}: MovieSessionGroupProps) => {
  return (
    <article className="flex flex-col gap-3.75">
      <div className="flex items-center gap-4">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="h-20 w-14 rounded-lg object-cover"
        />

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <h3 className="text-lg leading-none font-extrabold text-white">
              {movie.title}
            </h3>

            <Badge className="w-fit bg-danger-tint px-2 py-1 font-sans text-xs leading-none font-semibold text-danger">
              {movie.ageRating.code}
            </Badge>
          </div>

          <p className="text-sm leading-[130%] font-normal text-muted">
            {movie.runtimeMinutes} min
          </p>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1">
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>
    </article>
  );
};
