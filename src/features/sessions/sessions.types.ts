interface SessionFormat {
  id: number;
  slug: string;
  name: string;
  priceUplift: number;
}

interface SessionVenue {
  id: number;
  slug: string;
  name: string;
  city: string;
  formats: SessionFormat[];
}

interface SessionLanguage {
  id: number;
  slug: string;
  name: string;
  code: string;
}

interface SessionTimeBand {
  id: string;
  label: string;
}

interface SessionSortOption {
  id: string;
  label: string;
}

export interface SessionTicketType {
  id: number;
  slug: string;
  name: string;
  priceRatio: number;
  note: string | null;
  blockedFromRatingAge: number | null;
}

interface SessionAgeRating {
  code: string;
  minAge: number;
  description: string;
}

export interface SessionFilterOptions {
  venues: SessionVenue[];
  formats: SessionFormat[];
  languages: SessionLanguage[];
  timeBands: SessionTimeBand[];
  sorts: SessionSortOption[];
  ticketTypes: SessionTicketType[];
  ageRatings: SessionAgeRating[];
  maxSeatsPerOrder: number;
  holdMinutes: number;
}

export interface SessionsParams {
  date?: string;
  venues?: string[];
  formats?: string[];
  languages?: string[];
  timeBands?: string[];
  ticketTypes?: string[];
  ageRatings?: string[];
  sort?: string;
  page?: number;
}

interface SessionMovie {
  id: number;
  slug: string;
  title: string;
  posterUrl: string;
  runtimeMinutes: number;
  ageRating: { code: string; minAge: number; description: string };
}

export interface Session {
  id: number;
  isSoldOut: boolean;
  seatsLeft: number;
  time: string;
  format: { name: string };
  language: { name: string };
  hall: { name: string; venue: { name: string } };
  price: number;
}

export interface MovieSessionsGroup {
  movie: SessionMovie;
  sessions: Session[];
}

export interface SessionsResponse {
  data: MovieSessionsGroup[];
  meta: {
    currentPage: number;
    lastPage: number;
    totalMovies: number;
    totalSessions: number;
  };
}

export interface SessionDetails {
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
    venue: SessionVenue;
  };
  venue: SessionVenue;
  format: SessionFormat;
  language: SessionLanguage;
  movie: SessionMovie & {
    kind: string;
    backdropUrl: string;
    releaseDate: string;
    isComingSoon: boolean;
    isNotified: boolean;
    isFeatured: boolean;
    fromPrice: number;
    genres: { id: number; slug: string; name: string }[];
    formats: SessionFormat[];
  };
}

type SeatState = "available" | "sold" | "held" | "unavailable";

export interface SessionSeat {
  id: number;
  code: string;
  label: string;
  state: SeatState;
  aisleAfter: boolean;
  isMine: boolean;
}

interface SessionSeatRow {
  label: string;
  seats: SessionSeat[];
}

export interface SessionSeatSection {
  name: string;
  rows: SessionSeatRow[];
}

export interface SessionSeatMap {
  sessionId: number;
  hall: {
    id: number;
    name: string;
    venue: SessionVenue;
  };
  sections: SessionSeatSection[];
}
