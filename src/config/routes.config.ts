export const ROUTE_SEGMENTS = {
  SESSIONS: "sessions",
  MOVIE: "movies/:movieId",
  PROFILE: "profile",
} as const;

export const ROUTES = {
  HOME: "/",
  SESSIONS: "/sessions",
  MOVIE: (movieId: string | number) => `/movies/${movieId}`,
  PROFILE: "/profile",
} as const;
