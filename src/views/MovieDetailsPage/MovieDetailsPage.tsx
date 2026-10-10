import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCurrentUserQuery } from "../../api/queries/auth-queries";
import {
  useMovieDetailsQuery,
  useMovieSessionsQuery,
} from "../../features/movies/useNowPlayingQuery";
import { Badge, Clock, Timer } from "lucide-react";

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

  if (isPending) return <div>Loading movie...</div>;
  if (isError || !movie) return <div>Unable to load movie details.</div>;

  const isUnderAge =
    currentUser?.age != null && currentUser.age < movie.ageRating.minAge;

  return (
    <main className="relative min-h-screen bg-background text-white">
      {/* Hero */}
      <section className="relative isolate h-141.75 ">
        <img
          src={movie.backdropUrl}
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/30 via-black/70 to-background" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

        <div className=" px-15 flex items-end gap-8.5 h-full pb-15 ">
          <div className="w-72.25 h-93.5  ">
            <img
              src={movie.posterUrl}
              alt={`${movie.title} poster`}
              className=" w-full h-full rounded-xl object-cover shadow-2xl shadow-black/50 ring-1 ring-white/10"
            />
          </div>
          <div className="flex flex-col items-start gap-5 ">
            <div className="flex gap-2 items-center select-none">
              {movie.isFeatured && (
                <span className="rounded-full bg-danger/10 px-2.5 py-1.5 text-xs text-danger font-semibold">
                  FEATURED
                </span>
              )}
              {movie.isComingSoon && (
                <span className="rounded-full bg-danger/10 px-2.5 py-1.5 text-xs text-danger font-semibold">
                  COMING SOON
                </span>
              )}
              {movie.isNotified && (
                <span className="rounded-full bg-danger/10 px-2.5 py-1.5 text-xs text-danger font-semibold">
                  NOTIFICATIONS ON
                </span>
              )}
            </div>
            <div className="flex flex-col items-start gap-3.5">
              <h1 className="font-extrabold max-w-xl text-[40px] leading-[100%] tracking-normal ">
                {movie.title}
              </h1>

              <p className="max-w-xl text-[14px] font-normal leading-[130%] tracking-normal">
                {movie.synopsis}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.75 select-none">
              <span
                title={movie.ageRating.description}
                className="rounded-full bg-danger/10 px-2.5 py-1.5 text-xs text-danger"
              >
                {movie.ageRating.code}
              </span>
              <span className="rounded-full bg-white/10 px-2.5 py-1.5 text-xs flex gap-1 items-center">
                <Timer size={14} />
                {movie.runtimeMinutes} min
              </span>
              {movie.formats.map((format) => (
                <span
                  key={format.id}
                  className="rounded-full bg-white/10 px-2.5 py-1.5 text-xs"
                >
                  {format.name}
                </span>
              ))}
            </div>
          </div>

          {/* Poster */}
        </div>
      </section>

      {/* Content below hero */}
      <div className="mx-auto grid  grid-cols-1 gap-10 px-15 py-10 md:grid-cols-[minmax(0,1.5fr)_minmax(280px,1fr)]">
        {/* Showtimes on the left */}
        <section className="flex min-w-0 flex-col gap-6">
          <div>
            <h2 className="text-2xl font-bold">Showtimes</h2>
            <p className="mt-1 text-sm text-white/60">
              Select a date and choose a session.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {movie.availableDates.slice(0, 7).map((date) => (
              <button
                key={date}
                type="button"
                aria-pressed={selectedDate === date}
                onClick={() => setSelectedDate(date)}
                className={`rounded-lg border px-4 py-3 text-sm transition-colors ${
                  selectedDate === date
                    ? "border-red-500 bg-red-500 text-white"
                    : "border-white/15 bg-white/5 text-white/75 hover:border-white/40"
                }`}
              >
                {date}
              </button>
            ))}
          </div>

          {!selectedDate && (
            <p className="text-white/60">
              No upcoming showtimes are available.
            </p>
          )}

          {selectedDate && isSessionsPending && (
            <p className="text-white/60">Loading sessions...</p>
          )}

          {selectedDate && isSessionsError && (
            <p className="text-red-400">Unable to load sessions.</p>
          )}

          {venues?.map(({ venue, sessions }) => (
            <div
              key={venue.id}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
            >
              <h3 className="mb-4 font-semibold">
                {venue.name}
                <span className="ml-2 text-sm font-normal text-white/50">
                  {venue.city}
                </span>
              </h3>

              {sessions.length === 0 ? (
                <p className="text-sm text-white/50">
                  No sessions at this venue.
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                  {sessions.map((session) => {
                    const soldOut =
                      session.isSoldOut || session.seatsLeft === 0;
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
                        className="flex flex-col gap-2 rounded-lg border border-white/10 bg-white/5 p-3 text-left transition-colors hover:border-red-500/70 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <span className="text-lg font-semibold">
                          {session.time}
                        </span>

                        <div className="flex flex-wrap gap-1.5 text-xs text-white/70">
                          <span className="rounded bg-white/10 px-2 py-1">
                            {session.language.code}
                          </span>
                          <span className="rounded bg-white/10 px-2 py-1">
                            {session.format.name}
                          </span>
                        </div>

                        <span className="font-medium">₾{session.price}</span>

                        <span className="text-xs text-white/50">
                          {soldOut
                            ? "Sold out"
                            : `${session.seatsLeft} seats left`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {selectedDate &&
            !isSessionsPending &&
            !isSessionsError &&
            venues?.length === 0 && (
              <p className="text-white/60">
                No sessions available for this date.
              </p>
            )}
        </section>

        {/* Additional details on the right */}
        <aside className="flex flex-col gap-6">
          <section className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <h2 className="mb-5 text-xl font-bold">Movie details</h2>

            <dl className="flex flex-col gap-4 text-sm">
              <div className="flex flex-col gap-1">
                <dt className="text-white/50">Director</dt>
                <dd>{movie.director || "Not available"}</dd>
              </div>

              <div className="flex flex-col gap-1">
                <dt className="text-white/50">Cast</dt>
                <dd className="leading-6">{movie.cast || "Not available"}</dd>
              </div>

              <div className="flex flex-col gap-1">
                <dt className="text-white/50">Runtime</dt>
                <dd>{movie.runtimeMinutes} minutes</dd>
              </div>

              <div className="flex flex-col gap-1">
                <dt className="text-white/50">Release date</dt>
                <dd>{movie.releaseDate}</dd>
              </div>

              <div className="flex flex-col gap-1">
                <dt className="text-white/50">Age rating</dt>
                <dd title={movie.ageRating.description}>
                  {movie.ageRating.code} — {movie.ageRating.description}
                </dd>
              </div>

              <div className="flex flex-col gap-1">
                <dt className="text-white/50">Genres</dt>
                <dd>{movie.genres.map((genre) => genre.name).join(", ")}</dd>
              </div>

              <div className="flex flex-col gap-1">
                <dt className="text-white/50">Available formats</dt>
                <dd>{movie.formats.map((format) => format.name).join(", ")}</dd>
              </div>
            </dl>
          </section>
        </aside>
      </div>
    </main>
  );
};

export default MovieDetailsPage;
