import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCurrentUserQuery } from "@/features/auth/authQueries";
import type { MovieDetails } from "@/features/movies/movies.types";
import { useMountEffect } from "@/hooks/useMountEffect";
import { useModalStore } from "@/store/modalStore";
import { openModal } from "@/utils/modals/modalActions";

type IncomingState = { sessionId?: number; date?: string } | null;

export function useBuyTicketIntent(movie: MovieDetails | undefined) {
  const incoming = useLocation().state as IncomingState;

  const { data: currentUser, isLoading: isUserLoading } = useCurrentUserQuery();
  const authModalOpen = useModalStore((s) =>
    s.stack.some((entry) => entry.key === "AuthModal"),
  );

  const [pending, setPending] = useState<number | null>(
    incoming?.sessionId ?? null,
  );
  const promptedRef = useRef(false);

  useMountEffect(() => {
    if (incoming?.sessionId) {
      window.history.replaceState({ ...window.history.state, usr: null }, "");
    }
  });

  const isUnderAge =
    currentUser?.age != null &&
    movie != null &&
    currentUser.age < movie.ageRating.minAge;

  useEffect(() => {
    if (pending == null || isUserLoading || !movie) return;

    const finish = () => {
      promptedRef.current = false;
      setPending(null);
    };

    if (!currentUser) {
      if (!promptedRef.current) {
        promptedRef.current = true;
        openModal("AuthModal", { mode: "login" });
        return;
      }
      if (!authModalOpen) {
        const timer = setTimeout(finish, 1500);
        return () => clearTimeout(timer);
      }
      return;
    }

    if (authModalOpen) {
      const timer = setTimeout(() => {
        const entry = useModalStore
          .getState()
          .stack.find((e) => e.key === "AuthModal");
        if (entry) useModalStore.getState().popById(entry.id);
      }, 400);
      return () => clearTimeout(timer);
    }

    finish();
    if (!isUnderAge) {
      openModal("buyTicket", { sessionId: String(pending) });
    }
  }, [pending, currentUser, isUserLoading, movie, authModalOpen, isUnderAge]);

  return {
    currentUser,
    isUnderAge,
    initialDate: incoming?.date,
    requestBuyTicket: (sessionId: number) => setPending(sessionId),
  };
}
