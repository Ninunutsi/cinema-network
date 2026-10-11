import type { TicketType } from "../../../../features/booking/booking.types";

export type BuyStep = "seats" | "checkout";

export interface PickedSeat {
  seatId: number;
  code: string;
  rowLabel: string;
  sectionName: string;
  ticketTypeId: number;
}

export interface SelectionIssue {
  seatCode: string;
  reason: string;
}

export interface PricedSeat extends PickedSeat {
  ticketTypeName: string;
  price: number;
}

export interface HoldResponse {
  expiresAt: string;
}

export interface HoldConflictBody {
  seats: string[];
}

export interface CheckoutPayload {
  seats: { seatId: number; ticketTypeId: number }[];
  buyer: { fullName: string; email: string; mobile: string };
  card: { number: string; expiry: string; cvv: string };
}

export interface OrderConfirmation {
  reference: string;
  seats: { code: string; ticketType: string; price: number }[];
  total: number;
}

export type FieldErrors = Record<string, string>;

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
