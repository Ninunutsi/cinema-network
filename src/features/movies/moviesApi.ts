import { unwrap, type DataEnvelope } from "../../api/api.types";
import { httpClient } from "../../api/httpclient";
import type { Movie } from "./movies.types";

export const moviesApi = {
  async getNowPlaying(limit?: number): Promise<Movie[]> {
    const response = await httpClient.get<DataEnvelope<Movie[]>>(
      "/movies/now-playing",
      {
        params: limit === undefined ? undefined : { limit },
      },
    );

    return unwrap(response);
  },
  async getFeatured(): Promise<Movie[]> {
    const response =
      await httpClient.get<DataEnvelope<Movie[]>>("/movies/featured");

    return unwrap(response);
  },
};
