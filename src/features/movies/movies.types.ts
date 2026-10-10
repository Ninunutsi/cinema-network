export interface MovieGenre {
  id: number;
  slug: string;
  name: string;
}

export interface MovieAgeRating {
  code: string;
  minAge: number;
  description: string;
}

export interface MovieFormat {
  id: number;
  slug: string;
  name: string;
  priceUplift: number;
}

/** Fields every movie endpoint returns. */
interface MovieBase {
  id: number;
  slug: string;
  title: string;
  kind: string;
  runtimeMinutes: number;
  posterUrl: string;
  isComingSoon: boolean;
  backdropUrl: string | null;
  releaseDate: string;
  isNotified: boolean;
  fromPrice: number;
  ageRating: MovieAgeRating;
  genres: MovieGenre[];
}

export interface NowPlayingMovie extends MovieBase {
  synopsis: string;
  isComingSoon: false;
  isFeatured: boolean;
}

export interface FeaturedMovie extends NowPlayingMovie {
  isFeatured: true;
  formats: MovieFormat[];
}

export interface ComingSoonMovie extends MovieBase {
  isComingSoon: true;
  isFeatured: false;
  formats: MovieFormat[];
}

export interface MovieSearchResult extends MovieBase {
  formats: MovieFormat[];
}

export interface MovieDetails {
  id: number;
  slug: string;
  title: string;
  kind: string;
  runtimeMinutes: number;
  posterUrl: string;
  backdropUrl: string;
  releaseDate: string;
  isComingSoon: boolean;
  isNotified: boolean;
  isFeatured: boolean;
  fromPrice: number;
  ageRating: MovieAgeRating;
  genres: MovieGenre[];
  formats: MovieFormat[];
  synopsis: string;
  director: string;
  cast: string;
  availableDates: string[];
}

export interface SessionVenue {
  id: number;
  slug: string;
  name: string;
  city: string;
}

export interface SessionHall {
  id: number;
  name: string;
  venue: SessionVenue;
}

export interface SessionLanguage {
  id: number;
  slug: string;
  name: string;
  code: string;
}

export interface MovieSession {
  id: number;
  startsAt: string;
  date: string;
  time: string;
  timeBand: string;
  price: number;
  seatsLeft: number;
  isSoldOut: boolean;
  hall: SessionHall;
  venue: SessionVenue;
  format: MovieFormat;
  language: SessionLanguage;
}

export interface MovieSessionsByVenue {
  venue: SessionVenue;
  sessions: MovieSession[];
}
