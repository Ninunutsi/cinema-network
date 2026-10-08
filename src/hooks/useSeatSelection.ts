import { useRef, useState } from "react";
import type { ApiSection } from "../types/seatMap.types";

export const MAX_SEATS = 4;
const MESSAGE_DURATION_MS = 3000;

// pure helper: seats already in the user's live hold
export const getMineIds = (sections: ApiSection[]): number[] =>
  sections
    .flatMap((s) => s.rows)
    .flatMap((r) => r.seats)
    .filter((seat) => seat.isMine)
    .map((seat) => seat.id);

export const useSeatSelection = (initialIds: number[] = []) => {
  // lazy initializer runs once on mount, no effect needed
  const [selectedIds, setSelectedIds] = useState<number[]>(() => initialIds);
  const [limitReached, setLimitReached] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const hideLimitMessage = () => {
    clearTimeout(timerRef.current);
    setLimitReached(false);
  };

  const showLimitMessage = () => {
    clearTimeout(timerRef.current);
    setLimitReached(true);
    timerRef.current = setTimeout(
      () => setLimitReached(false),
      MESSAGE_DURATION_MS,
    );
  };

  const toggleSeat = (seatId: number) => {
    // deselecting is always allowed, even at the limit
    if (selectedIds.includes(seatId)) {
      setSelectedIds((prev) => prev.filter((id) => id !== seatId));
      hideLimitMessage();
      return;
    }

    if (selectedIds.length >= MAX_SEATS) {
      showLimitMessage();
      return;
    }

    setSelectedIds((prev) => [...prev, seatId]);
  };

  // call from event handlers: after a 409 refetch, hold expiry, modal reset
  const reset = (ids: number[] = []) => {
    setSelectedIds(ids);
    hideLimitMessage();
  };

  const removeUnavailable = (unavailableIds: number[]) =>
    setSelectedIds((prev) => prev.filter((id) => !unavailableIds.includes(id)));

  return {
    selectedIds,
    limitReached,
    isLimitReached: selectedIds.length >= MAX_SEATS,
    toggleSeat,
    reset,
    removeUnavailable,
  };
};
