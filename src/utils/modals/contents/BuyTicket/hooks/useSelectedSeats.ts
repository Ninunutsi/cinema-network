import { useMemo } from "react";
import type {
  SessionSeatMap,
  SessionTicketType,
} from "../../../../../features/sessions/sessions.types";
import type { SelectedSeatView } from "../buy-tickets.types";
import {
  buildSeatLookup,
  calcSeatPrice,
  getTicketTypeIssue,
  roundMoney,
} from "../buy-ticket.utils";
import {
  DEFAULT_TICKET_TYPE,
  useSeatsStore,
} from "../../../../../store/SeatsStore";

interface Params {
  seatMap: SessionSeatMap | undefined;
  ticketTypes: SessionTicketType[];
  basePrice: number;
  movieMinAge: number;
}

export const useSelectedSeats = ({
  seatMap,
  ticketTypes,
  basePrice,
  movieMinAge,
}: Params) => {
  const selectedIds = useSeatsStore((state) => state.selectedIds);
  const ticketTypeBySeat = useSeatsStore((state) => state.ticketTypes);

  const seats = useMemo<SelectedSeatView[]>(() => {
    const lookup = buildSeatLookup(seatMap);

    return selectedIds.flatMap((seatId) => {
      const entry = lookup.get(seatId);
      const slug = ticketTypeBySeat[seatId] ?? DEFAULT_TICKET_TYPE;
      const ticketType = ticketTypes.find((type) => type.slug === slug);
      if (!entry || !ticketType) return [];

      return [
        {
          seatId,
          code: entry.seat.code,
          sectionName: entry.sectionName,
          ticketType: slug,
          price: calcSeatPrice(basePrice, ticketType),
          issue: getTicketTypeIssue(ticketType, movieMinAge),
        },
      ];
    });
  }, [
    selectedIds,
    ticketTypeBySeat,
    seatMap,
    ticketTypes,
    basePrice,
    movieMinAge,
  ]);

  const subtotal = roundMoney(seats.reduce((sum, seat) => sum + seat.price, 0));

  return { seats, subtotal };
};
