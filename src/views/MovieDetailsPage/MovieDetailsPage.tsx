import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useMovieDetailsQuery,
  useMovieSessionsQuery,
} from "../../features/movies/moviesQueries";
import { MovieDetailsHero } from "./components/MovieDetailsHero";
import { MovieSessionsSection } from "./components/MovieSessionsSection";
import { MovieDetailsSidebar } from "./components/MovieDetailsSidebar";
import { useMountEffect } from "../../hooks/useMountEffect";
import { useRecentlyViewed } from "../HomePage/useRecentlyViewed";
import { toRecentlyViewedMovie } from "../HomePage/recentlyViewed.utils";
import type { MovieDetails } from "../../features/movies/movies.types";
import { useBuyTicketIntent } from "./useBuyTicketIntent";

const RecentlyViewedTracker = ({ movie }: { movie: MovieDetails }) => {
  const { addMovie } = useRecentlyViewed();

  useMountEffect(() => {
    addMovie(toRecentlyViewedMovie(movie));
  });

  return null;
};

const MovieDetailsPage = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const { data: movie, isPending, isError } = useMovieDetailsQuery(movieId);
  const { isUnderAge, initialDate, requestBuyTicket } =
    useBuyTicketIntent(movie);

  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    initialDate,
  );

  const availableDates = movie?.availableDates ?? [];
  const activeDate =
    selectedDate && availableDates.includes(selectedDate)
      ? selectedDate
      : (availableDates[0] ?? "");

  const {
    data: venues,
    isPending: isSessionsPending,
    isError: isSessionsError,
  } = useMovieSessionsQuery(movieId, activeDate);

  if (isPending) {
    return <div>Loading movie...</div>;
  }

  if (isError || !movie) {
    return <div>Unable to load movie details.</div>;
  }

  return (
    <main className="relative min-h-screen bg-background text-white">
      <RecentlyViewedTracker key={movie.id} movie={movie} />
      <MovieDetailsHero movie={movie} />

      <div className="flex justify-between gap-10 px-15">
        <MovieSessionsSection
          availableDates={movie.availableDates}
          selectedDate={activeDate}
          onDateChange={setSelectedDate}
          venues={venues}
          isPending={isSessionsPending}
          isError={isSessionsError}
          isUnderAge={isUnderAge}
          onTicketClick={requestBuyTicket}
        />

        <MovieDetailsSidebar movie={movie} />
      </div>
    </main>
  );
};

export default MovieDetailsPage;
