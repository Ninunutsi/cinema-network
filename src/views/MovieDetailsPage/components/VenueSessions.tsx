import type { MovieSessionsByVenue } from "../../../features/movies/movies.types";
import { SessionTicketCard } from "./SessionTicketCard";

interface VenueSessionsProps {
  venue: MovieSessionsByVenue["venue"];
  sessions: MovieSessionsByVenue["sessions"];
  isUnderAge: boolean;
}

export const VenueSessions = ({
  venue,
  sessions,
  isUnderAge,
}: VenueSessionsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-extrabold leading-none">{venue.name}</h3>

      {sessions.length === 0 ? (
        <p className="text-sm text-white/50">No sessions at this venue.</p>
      ) : (
        <div className="flex flex-wrap items-center gap-2.5">
          {sessions.map((session) => (
            <SessionTicketCard
              key={session.id}
              session={session}
              isUnderAge={isUnderAge}
            />
          ))}
        </div>
      )}
    </div>
  );
};
