import { unwrap, type DataEnvelope } from "../../api/api.types";
import { httpClient } from "../../api/httpclient";
import type {
  ComingSoonMovie,
  FeaturedMovie,
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
};
