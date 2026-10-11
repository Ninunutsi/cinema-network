import { isAxiosError } from "axios";
import type {
  BookingErrorResponse,
  TicketType,
} from "../../../../features/booking/booking.types";
import type {
  SessionSeat,
  SessionSeatMap,
  SessionTicketType,
} from "../../../../features/sessions/sessions.types";
import type { TicketOption } from "./buy-tickets.types";

const TICKET_TYPES: readonly string[] = ["adult", "student", "child"];

const isTicketType = (slug: string): slug is TicketType =>
  TICKET_TYPES.includes(slug);

export const roundMoney = (amount: number) => Math.round(amount * 100) / 100;

export const formatGel = (amount: number) => {
  const value = roundMoney(amount);
  return `₾ ${Number.isInteger(value) ? value : value.toFixed(2)}`;
};
export const formatSessionDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

export const calcSeatPrice = (
  basePrice: number,
  ticketType: SessionTicketType,
) => roundMoney(basePrice * ticketType.priceRatio);

export const getTicketTypeIssue = (
  ticketType: SessionTicketType,
  movieMinAge: number,
): string | null =>
  ticketType.blockedFromRatingAge != null &&
  movieMinAge >= ticketType.blockedFromRatingAge
    ? `${ticketType.name} tickets are not allowed for ${movieMinAge}+ movies.`
    : null;

export const createTicketOptions = (
  ticketTypes: SessionTicketType[],
): TicketOption[] =>
  ticketTypes
    .filter((type): type is SessionTicketType & { slug: TicketType } =>
      isTicketType(type.slug),
    )
    .sort((a, b) => a.priceRatio - b.priceRatio)
    .map((type) => ({
      slug: type.slug,
      name: type.name,
      percent: Math.round(type.priceRatio * 100),
    }));

export interface SeatLookupEntry {
  seat: SessionSeat;
  rowLabel: string;
  sectionName: string;
}

export const buildSeatLookup = (
  seatMap: SessionSeatMap | undefined,
): Map<number, SeatLookupEntry> => {
  const lookup = new Map<number, SeatLookupEntry>();

  seatMap?.sections.forEach((section) =>
    section.rows.forEach((row) =>
      row.seats.forEach((seat) =>
        lookup.set(seat.id, {
          seat,
          rowLabel: row.label,
          sectionName: section.name,
        }),
      ),
    ),
  );

  return lookup;
};

export const markSeatsSold = (
  seatMap: SessionSeatMap,
  codes: string[],
): SessionSeatMap => ({
  ...seatMap,
  sections: seatMap.sections.map((section) => ({
    ...section,
    rows: section.rows.map((row) => ({
      ...row,
      seats: row.seats.map((seat) =>
        codes.includes(seat.code) ? { ...seat, state: "sold" as const } : seat,
      ),
    })),
  })),
});

export const getErrorMessage = (error: unknown, fallback: string) =>
  isAxiosError<BookingErrorResponse>(error)
    ? (error.response?.data?.message ?? fallback)
    : fallback;
