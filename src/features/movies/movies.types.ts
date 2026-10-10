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

/** /movies/now-playing: bookable, carries a synopsis. */
export interface NowPlayingMovie extends MovieBase {
  synopsis: string;
  isComingSoon: false;
  isFeatured: boolean; // featured titles are a subset of now playing
}

/** /movies/featured: now playing, flagged for the hero. */
export interface FeaturedMovie extends NowPlayingMovie {
  isFeatured: true;
  formats: MovieFormat[];
}

/** /movies/coming-soon: no sessions, no synopsis. */
export interface ComingSoonMovie extends MovieBase {
  isComingSoon: true;
  isFeatured: false;
  formats: MovieFormat[];
}

export interface MovieSearchResult extends MovieBase {
  formats: MovieFormat[];
}
