import type { MovieSessionsByVenue } from "../../../features/movies/movies.types";
import { MovieDateSelector } from "./MovieDateSelector";
import { VenueSessions } from "./VenueSessions";

interface MovieSessionsSectionProps {
  availableDates: string[];
  selectedDate: string;
  onDateChange: (date: string) => void;
  venues: MovieSessionsByVenue[] | undefined;
  isPending: boolean;
  isError: boolean;
  isUnderAge: boolean;
}

export const MovieSessionsSection = ({
  availableDates,
  selectedDate,
  onDateChange,
  venues,
  isPending,
  isError,
  isUnderAge,
}: MovieSessionsSectionProps) => {
  return (
    <section className="flex min-w-0 flex-col gap-6">
      <h2 className="text-[20px] font-extrabold leading-none">Sessions</h2>

      <MovieDateSelector
        dates={availableDates}
        selectedDate={selectedDate}
        onDateChange={onDateChange}
      />

      {!selectedDate && (
        <p className="text-white/60">No upcoming showtimes are available.</p>
      )}

      {selectedDate && isPending && (
        <p className="text-white/60">Loading sessions...</p>
      )}

      {selectedDate && isError && (
        <p className="text-red-400">Unable to load sessions.</p>
      )}

      {selectedDate && !isPending && !isError && venues?.length === 0 && (
        <p className="text-white/60">No sessions available for this date.</p>
      )}

      {selectedDate && !isPending && !isError && venues?.length === 0 && (
        <p className="text-white/60">No sessions available for this date.</p>
      )}

      {!isPending &&
        !isError &&
        venues?.map(({ venue, sessions }) => (
          <VenueSessions
            key={venue.id}
            venue={venue}
            sessions={sessions}
            isUnderAge={isUnderAge}
          />
        ))}
    </section>
  );
};
