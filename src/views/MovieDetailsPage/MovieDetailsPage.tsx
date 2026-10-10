import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCurrentUserQuery } from "../../api/queries/auth-queries";
import {
  useMovieDetailsQuery,
  useMovieSessionsQuery,
} from "../../features/movies/useNowPlayingQuery";

const MovieDetailsPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const { data: movie, isPending, isError } = useMovieDetailsQuery(movieId);
  const { data: currentUser } = useCurrentUserQuery();

  const [selectedDate, setSelectedDate] = useState<string>();

  useEffect(() => {
    if (!movie?.availableDates.length) {
      setSelectedDate(undefined);
      return;
    }

    setSelectedDate((current) =>
      current && movie.availableDates.includes(current)
        ? current
        : movie.availableDates[0],
    );
  }, [movie]);

  const {
    data: venues,
    isPending: isSessionsPending,
    isError: isSessionsError,
  } = useMovieSessionsQuery(movieId, selectedDate ?? "");

  if (isPending) {
    return <div>Loading movie...</div>;
  }

  if (isError || !movie) {
    return <div>Unable to load movie details.</div>;
  }

  const isUnderAge =
    currentUser?.age != null && currentUser.age < movie.ageRating.minAge;

  return (
    <main className="flex flex-col gap-6 text-white">
      <img
        src={movie.backdropUrl}
        alt=""
        className="max-h-96 w-full object-cover"
      />

      <h1 className="text-3xl font-bold">{movie.title}</h1>

      <p>{movie.synopsis}</p>
      <p>{movie.runtimeMinutes} min</p>

      <div title={movie.ageRating.description}>{movie.ageRating.code}</div>

      <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
      <p>Director: {movie.director}</p>
      <p>Cast: {movie.cast}</p>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-bold">Showtimes</h2>

        <div className="flex flex-wrap gap-2">
          {movie.availableDates.slice(0, 7).map((date) => (
            <button
              key={date}
              type="button"
              aria-pressed={selectedDate === date}
              onClick={() => setSelectedDate(date)}
              className={`rounded-lg border px-3 py-2 ${
                selectedDate === date
                  ? "border-red-500 bg-red-500 text-white"
                  : "border-gray-500"
              }`}
            >
              {date}
            </button>
          ))}
        </div>

        {!selectedDate && <p>No upcoming showtimes are available.</p>}

        {selectedDate && isSessionsPending && <p>Loading sessions...</p>}

        {selectedDate && isSessionsError && <p>Unable to load sessions.</p>}

        {venues?.map(({ venue, sessions }) => (
          <div key={venue.id} className="rounded-xl border p-4">
            <h3 className="mb-3 font-bold">
              {venue.name} · {venue.city}
            </h3>

            <div className="flex flex-wrap gap-3">
              {sessions.map((session) => {
                const soldOut = session.isSoldOut || session.seatsLeft === 0;

                const disabled = soldOut || isUnderAge;

                return (
                  <button
                    key={session.id}
                    type="button"
                    disabled={disabled}
                    title={
                      isUnderAge
                        ? movie.ageRating.description
                        : session.language.name
                    }
                    className="flex flex-col gap-1 rounded-lg border p-3 text-left disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <span className="font-bold">{session.time}</span>
                    <span>{session.language.code}</span>
                    <span>{session.format.name}</span>
                    <span>₾{session.price}</span>
                    <span>
                      {soldOut ? "Sold out" : `${session.seatsLeft} seats left`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {selectedDate &&
          !isSessionsPending &&
          !isSessionsError &&
          venues?.length === 0 && <p>No sessions available for this date.</p>}
      </section>
    </main>
  );
};

export default MovieDetailsPage;
