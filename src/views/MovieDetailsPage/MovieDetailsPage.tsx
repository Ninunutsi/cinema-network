import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useCurrentUserQuery } from "../../api/queries/auth-queries";
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
import { openModal } from "../../utils/modals/modalActions";
import { useModalStore } from "../../store/modalStore";

type SessionLocationState = {
  sessionId?: number;
  date?: string;
} | null;

const RecentlyViewedTracker = ({ movie }: { movie: MovieDetails }) => {
  const { addMovie } = useRecentlyViewed();

  useMountEffect(() => {
    addMovie(toRecentlyViewedMovie(movie));
  });

  return null;
};

const MovieDetailsPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const location = useLocation();
  const incoming = location.state as SessionLocationState;

  const { data: movie, isPending, isError } = useMovieDetailsQuery(movieId);
  const { data: currentUser, isLoading: isUserLoading } = useCurrentUserQuery();

  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    incoming?.date,
  );

  const pendingSessionRef = useRef<number | null>(null);
  const handledArrivalRef = useRef<number | null>(null);

  const authModalOpen = useModalStore((s) =>
    s.stack.some((entry) => entry.key === "AuthModal"),
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

  const isBlockedByAge = (age?: number | null) =>
    age != null && movie != null && age < movie.ageRating.minAge;

  useEffect(() => {
    if (!incoming?.sessionId || isUserLoading || !movie) return;
    if (handledArrivalRef.current === incoming.sessionId) return;
    handledArrivalRef.current = incoming.sessionId;

    const { sessionId } = incoming;

    window.history.replaceState({ ...window.history.state, usr: null }, "");

    if (currentUser) {
      if (!isBlockedByAge(currentUser.age)) {
        openModal("buyTicket", { sessionId: String(sessionId) });
      }
      return;
    }

    pendingSessionRef.current = sessionId;
    openModal("AuthModal", { mode: "login" });
  }, [incoming?.sessionId, isUserLoading, movie]);

  useEffect(() => {
    if (!currentUser || pendingSessionRef.current == null || !movie) return;
    if (authModalOpen) return;

    const sessionId = pendingSessionRef.current;
    pendingSessionRef.current = null;

    if (!isBlockedByAge(currentUser.age)) {
      openModal("buyTicket", { sessionId: String(sessionId) });
    }
  }, [currentUser, movie, authModalOpen]);

  useEffect(() => {
    if (!currentUser || !authModalOpen || pendingSessionRef.current == null)
      return;

    const timer = setTimeout(() => {
      const entry = useModalStore
        .getState()
        .stack.find((e) => e.key === "AuthModal");
      if (entry) useModalStore.getState().popById(entry.id);
    }, 400);

    return () => clearTimeout(timer);
  }, [currentUser, authModalOpen]);

  useEffect(() => {
    if (authModalOpen || currentUser || pendingSessionRef.current == null)
      return;

    const timer = setTimeout(() => {
      pendingSessionRef.current = null;
    }, 1500);

    return () => clearTimeout(timer);
  }, [authModalOpen, currentUser]);

  if (isPending) {
    return <div>Loading movie...</div>;
  }

  if (isError || !movie) {
    return <div>Unable to load movie details.</div>;
  }

  const isUnderAge = isBlockedByAge(currentUser?.age);

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
          onTicketClick={(sessionId) => {
            if (!currentUser) {
              pendingSessionRef.current = sessionId;
              openModal("AuthModal", { mode: "login" });
              return;
            }
            openModal("buyTicket", { sessionId: String(sessionId) });
          }}
        />

        <MovieDetailsSidebar movie={movie} />
      </div>
    </main>
  );
};

export default MovieDetailsPage;
