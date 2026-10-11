export type TicketType = "adult" | "student" | "child";

export interface HoldSeatRequest {
  seatId: number;
  ticketType: TicketType;
}

export interface CreateHoldRequest {
  seats: HoldSeatRequest[];
}

export interface HeldSeat {
  seatId: number;
  code: string;
  ticketType: {
    slug: TicketType;
    name: string;
  };
  price: number;
}

export interface SeatHold {
  holdId: string;
  sessionId: number;
  expiresAt: string;
  secondsRemaining: number;
  isLive: boolean;
  subtotal: number;
  seats: HeldSeat[];
}

export interface CreateHoldResponse {
  data: SeatHold;
}

export interface HoldConflictResponse {
  message: string;
  contested: string[];
}

export interface BookingErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export interface CreateOrderRequest {
  holdId: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  cardNumber: string;
  expiry: string;

  cvv: string;
}

export interface OrderContact {
  fullName: string;
  email: string;
  mobileNumber: string;
}

export interface OrderTicket {
  id: number;
  seatCode: string;
  ticketType: {
    slug: TicketType;
    name: string;
  };
  price: number;
}

export interface OrderFormat {
  id: number;
  slug: string;
  name: string;
  priceUplift: number;
}

export interface OrderLanguage {
  id: number;
  slug: string;
  name: string;
  code: string;
}

export interface OrderGenre {
  id: number;
  slug: string;
  name: string;
}

export interface OrderMovie {
  id: number;
  slug: string;
  title: string;
  kind: string;
  runtimeMinutes: number;
  posterUrl: string;
  backdropUrl: string;
  releaseDate: string;
  isComingSoon: boolean;
  isFeatured: boolean;
  fromPrice: number;
  ageRating: {
    code: string;
    minAge: number;
    description: string;
  };
  genres: OrderGenre[];
  formats: OrderFormat[];
}

export interface OrderVenue {
  id: number;
  slug: string;
  name: string;
  city: string;
  formats: OrderFormat[];
}

export interface OrderSession {
  id: number;
  startsAt: string;
  date: string;
  time: string;
  timeBand: string;
  price: number;
  seatsLeft: number;
  isSoldOut: boolean;
  hall: {
    id: number;
    name: string;
  };
  venue: OrderVenue;
  format: OrderFormat;
  language: OrderLanguage;
  movie: OrderMovie;
}

export interface Order {
  id: number;
  reference: string;
  status: string;
  totalPrice: number;
  paidAt: string;
  refundedAt: string | null;
  isUpcoming: boolean;
  isRefundable: boolean;
  cardLastFour: string;
  contact: OrderContact;
  session: OrderSession;
  tickets: OrderTicket[];
}

export interface CreateOrderResponse {
  data: Order;
}
