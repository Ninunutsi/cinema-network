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

export interface Movie {
  id: number;
  slug: string;
  title: string;
  kind: string;
  runtimeMinutes: number;
  posterUrl: string;
  backdropUrl: string | null;
  releaseDate: string;
  synopsis: string;
  isComingSoon: boolean;
  isNotified: boolean;
  isFeatured: boolean;
  fromPrice: number;
  ageRating: MovieAgeRating;
  genres: MovieGenre[];
}
