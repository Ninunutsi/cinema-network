import type { TicketType } from "../../../../features/booking/booking.types";

export type BuyStep = "seats" | "checkout";

export interface SelectedSeatView {
  seatId: number;
  code: string;
  sectionName: string;
  ticketType: TicketType;
  price: number;
  issue: string | null;
}

export interface TicketOption {
  slug: TicketType;
  name: string;
  percent: number;
}
