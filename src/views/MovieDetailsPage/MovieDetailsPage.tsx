import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCurrentUserQuery } from "../../api/queries/auth-queries";
import {
  useMovieDetailsQuery,
  useMovieSessionsQuery,
} from "../../features/movies/useNowPlayingQuery";
import { Badge, Clock, Timer } from "lucide-react";
import { MovieDetailItem } from "../../components/atoms/MovieDetailItem";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import TktPerf from "../../assets/ticket-perforation.svg?react";
import Ticket from "../../assets/ticket.svg?react";

const formatShowtimeDate = (date: string) => {
  const parsedDate = new Date(`${date}T12:00:00`);

  return {
    day: parsedDate.toLocaleDateString("en-US", { weekday: "short" }),
    date: parsedDate.getDate(),
  };
};

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
      <section className="relative isolate h-141.75 mb-8">
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

      <div className="px-15 flex gap.2.5 justify-between">
        <section className="flex min-w-0 flex-col gap-6">
          <div>
            <h2 className="text-[20px] font-extrabold leading-[100%] tracking-normal">
              Sessions
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {movie.availableDates.slice(0, 7).map((date) => (
              <button
                key={date}
                type="button"
                aria-pressed={selectedDate === date}
                onClick={() => setSelectedDate(date)}
                className={`flex h-20 shrink-0 cursor-pointer justify-center items-center flex-col gap-1.5 rounded-2xl px-2.5 py-2.25 transition-[width] duration-300 ease-in-out ${
                  selectedDate === date
                    ? "w-25 border-danger bg-danger text-white"
                    : "w-20 border-background-tint bg-background-tint text-white"
                }`}
              >
                <span className="text-xs font-semibold leading-[100%] tracking-normal">
                  {formatShowtimeDate(date).day}
                </span>
                <span className="text-lg font-extrabold leading-[100%] tracking-normal">
                  {formatShowtimeDate(date).date}
                </span>
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
            <div key={venue.id} className="flex flex-col gap-4">
              <h3 className="text-sm font-extrabold leading-[100%] tracking-normal">
                {venue.name}
              </h3>

              {sessions.length === 0 ? (
                <p className="text-sm text-white/50">
                  No sessions at this venue.
                </p>
              ) : (
                <div className="flex items-center gap-2.5 flex-wrap">
                  {sessions.map((session) => {
                    const soldOut =
                      session.isSoldOut || session.seatsLeft === 0;
                    const disabled = soldOut || isUnderAge;

                    return (
                      <div
                        className="flex flex-col h-33.25 rounded-[18px] p-3.75 gap-2.25 bg-background-tint"
                        key={session.id}
                      >
                        <span className="text-xs font-semibold leading-[100%] tracking-normal text-white">
                          Hall {session.hall.name}
                        </span>
                        <button
                          className="w-[207px] h-20.25 relative cursor-pointer overflow-hidden"
                          disabled={disabled}
                        >
                          <div className=" size-3.5 bg-background-tint absolute rounded-full left-[117px] top-[74px]" />
                          <div className=" size-3.5 bg-background-tint absolute rounded-full left-[117px] bottom-[74px]" />
                          <TktPerf className="absolute left-30.75 top-2.5" />
                          <div className="w-full h-full gap-2  bg-background flex justify-between rounded-xl">
                            <div className="flex flex-col h-20.25 w-31 gap-2 py-3.75 min-w-0">
                              <h2 className="text-[20px] font-extrabold leading-[100%] tracking-normal text-white">
                                {session.time}
                              </h2>
                              <div className="flex items-center justify-center gap-1.5 text-xs text-muted">
                                <span className="">
                                  {session.language.code}
                                </span>
                                <span className="max-w-17.5 text-xs truncate rounded-full bg-background-tint px-3 py-1">
                                  {session.format.name}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col h-20.25 w-20.75 gap-2.5 py-3.75 min-w-0">
                              <h3 className="text-lg font-extrabold leading-[100%] tracking-normal h-5 text-danger">
                                ₾ {session.price}
                              </h3>
                              <span className="text-xs font-normal leading-[130%] tracking-normal text-muted flex items-start justify-center gap-1">
                                <Ticket className="size-3 fill-muted" />{" "}
                                {session.seatsLeft} left
                              </span>
                            </div>
                          </div>
                        </button>
                      </div>
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
          <section className="rounded-xl w-110.25 px-6.5 flex flex-col gap-4.25">
            <h2 className="text-[20px] font-extrabold leading-[100%] tracking-normal">
              Details
            </h2>

            <dl className="flex flex-col gap-4 text-sm">
              <MovieDetailItem label="DIRECTOR" value={movie.director} />
              <MovieDetailItem label="MAIN CAST" value={movie.cast} />
              <MovieDetailItem
                label="DURATION"
                value={`${movie.runtimeMinutes} minutes`}
              />
              <MovieDetailItem label="RELEASE DATE" value={movie.releaseDate} />
              <MovieDetailItem
                label="FORMATS"
                value={movie.formats.map((format) => format.name).join(", ")}
              />
              <MovieDetailItem
                label="FROM"
                value={`₾${String(movie.fromPrice)}`}
              />

              <Alert className="h-17.5 rounded-lg bg-warning/10 px-2.25 py-2.75">
                <AlertTitle className="mb-1.75 font-sans text-xs font-semibold leading-none text-warning">
                  RATING NOTE
                </AlertTitle>
                <AlertDescription className="flex justify-between items-start gap-1.75 font-sans text-xs font-normal leading-[130%] text-warning">
                  <p>{movie.ageRating.code}</p>
                  <p>{movie.ageRating.description}</p>
                </AlertDescription>
              </Alert>
            </dl>
          </section>
        </aside>
      </div>
    </main>
  );
};

export default MovieDetailsPage;
