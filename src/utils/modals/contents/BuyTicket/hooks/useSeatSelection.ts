import { useCallback, useReducer } from "react";
import type { PickedSeat } from "../buy-tickets.types";
import type { SessionSeat } from "../../../../../features/sessions/sessions.types";

interface State {
  seats: PickedSeat[];
  notice: string | null;
}

type Action =
  | {
      type: "toggle";
      seat: SessionSeat;
      rowLabel: string;
      sectionName: string;
      maxSeats: number;
      defaultTicketTypeId: number;
    }
  | { type: "setTicketType"; seatId: number; ticketTypeId: number }
  | { type: "remove"; codes: string[] }
  | { type: "clear" }
  | { type: "dismissNotice" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "toggle": {
      const { seat } = action;
      const exists = state.seats.some((s) => s.seatId === seat.id);

      if (exists) {
        return {
          notice: null,
          seats: state.seats.filter((s) => s.seatId !== seat.id),
        };
      }
      if (seat.state !== "available" && !seat.isMine) return state;

      if (state.seats.length >= action.maxSeats) {
        return {
          ...state,
          notice: `You can select up to ${action.maxSeats} seats per order.`,
        };
      }
      return {
        notice: null,
        seats: [
          ...state.seats,
          {
            seatId: seat.id,
            code: seat.code,
            rowLabel: action.rowLabel,
            sectionName: action.sectionName,
            ticketTypeId: action.defaultTicketTypeId,
          },
        ],
      };
    }
    case "setTicketType":
      return {
        ...state,
        seats: state.seats.map((s) =>
          s.seatId === action.seatId
            ? { ...s, ticketTypeId: action.ticketTypeId }
            : s,
        ),
      };
    case "remove":
      return {
        ...state,
        seats: state.seats.filter((s) => !action.codes.includes(s.code)),
      };
    case "clear":
      return { seats: [], notice: null };
    case "dismissNotice":
      return { ...state, notice: null };
  }
};

export function useSeatSelection(
  maxSeats: number,
  defaultTicketTypeId: number,
) {
  const [state, dispatch] = useReducer(reducer, { seats: [], notice: null });

  const toggleSeat = useCallback(
    (seat: SessionSeat, rowLabel: string, sectionName: string) =>
      dispatch({
        type: "toggle",
        seat,
        rowLabel,
        sectionName,
        maxSeats,
        defaultTicketTypeId,
      }),
    [maxSeats, defaultTicketTypeId],
  );

  return {
    seats: state.seats,
    notice: state.notice,
    toggleSeat,
    setTicketType: (seatId: number, ticketTypeId: number) =>
      dispatch({ type: "setTicketType", seatId, ticketTypeId }),
    removeSeats: (codes: string[]) => dispatch({ type: "remove", codes }),
    clear: () => dispatch({ type: "clear" }),
    dismissNotice: () => dispatch({ type: "dismissNotice" }),
  };
}
