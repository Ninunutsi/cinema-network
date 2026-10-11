import { create } from "zustand";
import type { TicketType } from "../features/booking/booking.types";

export const MAX_SEATS = 3;
export const DEFAULT_TICKET_TYPE: TicketType = "adult";

interface SeatState {
  selectedIds: number[];
  ticketTypes: Record<number, TicketType>;
  limitReached: boolean;

  toggleSeat: (seatId: number) => void;
  setTicketType: (seatId: number, ticketType: TicketType) => void;
  removeSeats: (seatIds: number[]) => void;
  reset: () => void;
}

const initialState = {
  selectedIds: [] as number[],
  ticketTypes: {} as Record<number, TicketType>,
  limitReached: false,
};

const omitSeats = (
  ticketTypes: Record<number, TicketType>,
  seatIds: number[],
): Record<number, TicketType> =>
  Object.fromEntries(
    Object.entries(ticketTypes).filter(([id]) => !seatIds.includes(Number(id))),
  );

export const useSeatStore = create<SeatState>((set) => ({
  ...initialState,

  toggleSeat: (seatId) =>
    set((state) => {
      if (state.selectedIds.includes(seatId)) {
        return {
          selectedIds: state.selectedIds.filter((id) => id !== seatId),
          ticketTypes: omitSeats(state.ticketTypes, [seatId]),
          limitReached: false,
        };
      }

      if (state.selectedIds.length >= MAX_SEATS) {
        return { limitReached: true };
      }

      return {
        selectedIds: [...state.selectedIds, seatId],
        limitReached: false,
      };
    }),

  setTicketType: (seatId, ticketType) =>
    set((state) => ({
      ticketTypes: { ...state.ticketTypes, [seatId]: ticketType },
    })),

  removeSeats: (seatIds) =>
    set((state) => ({
      selectedIds: state.selectedIds.filter((id) => !seatIds.includes(id)),
      ticketTypes: omitSeats(state.ticketTypes, seatIds),
      limitReached: false,
    })),

  reset: () => set(initialState),
}));
