import { unwrap, type DataEnvelope } from "../../api/api.types";
import { httpClient } from "../../api/httpclient";
import type {
  ComingSoonMovie,
  FeaturedMovie,
  MovieDetails,
  MovieNotificationResponse,
  MovieSearchResult,
  MovieSessionsByVenue,
  NowPlayingMovie,
} from "./movies.types";

export const moviesApi = {
  async getNowPlaying(limit?: number): Promise<NowPlayingMovie[]> {
    const response = await httpClient.get<DataEnvelope<NowPlayingMovie[]>>(
      "/movies/now-playing",
      { params: limit === undefined ? undefined : { limit } },
    );
    return unwrap(response);
  },

  async getFeatured(): Promise<FeaturedMovie[]> {
    const response =
      await httpClient.get<DataEnvelope<FeaturedMovie[]>>("/movies/featured");
    return unwrap(response);
  },

  async getComingSoon(limit?: number): Promise<ComingSoonMovie[]> {
    const response = await httpClient.get<DataEnvelope<ComingSoonMovie[]>>(
      "/movies/coming-soon",
      { params: limit === undefined ? undefined : { limit } },
    );
    return unwrap(response);
  },

  async search(query: string): Promise<MovieSearchResult[]> {
    const response = await httpClient.get<DataEnvelope<MovieSearchResult[]>>(
      "/search",
      {
        params: { q: query },
      },
    );

    return unwrap(response);
  },

  async getMovieDetails(movie: string): Promise<MovieDetails> {
    const response = await httpClient.get<DataEnvelope<MovieDetails>>(
      `/movies/${encodeURIComponent(movie)}`,
    );

    return unwrap(response);
  },

  async getMovieSessions(
    movie: string,
    date?: string,
  ): Promise<MovieSessionsByVenue[]> {
    const response = await httpClient.get<DataEnvelope<MovieSessionsByVenue[]>>(
      `/movies/${encodeURIComponent(movie)}/sessions`,
      {
        params: date ? { date } : undefined,
      },
    );

    return unwrap(response);
  },

  async notify(movie: string): Promise<MovieNotificationResponse> {
    const response = await httpClient.post<
      DataEnvelope<MovieNotificationResponse>
    >(`/movies/${encodeURIComponent(movie)}/notify`);

    return unwrap(response);
  },
};
