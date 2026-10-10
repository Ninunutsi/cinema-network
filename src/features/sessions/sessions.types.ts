export interface SessionFormat {
  id: number;
  slug: string;
  name: string;
  priceUplift: number;
}

export interface SessionVenue {
  id: number;
  slug: string;
  name: string;
  city: string;
  formats: SessionFormat[];
}

export interface SessionLanguage {
  id: number;
  slug: string;
  name: string;
  code: string;
}

export interface SessionTimeBand {
  id: string;
  label: string;
}

export interface SessionSortOption {
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

export interface SessionAgeRating {
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

export interface SessionMovie {
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
