import { unwrap, type DataEnvelope } from "../../api/api.types";
import { httpClient } from "../../api/httpclient";
import type {
  SessionDetails,
  SessionFilterOptions,
  SessionSeatMap,
  SessionsParams,
  SessionsResponse,
} from "./sessions.types";

export const sessionsApi = {
  async getFilterOptions(): Promise<SessionFilterOptions> {
    const response =
      await httpClient.get<DataEnvelope<SessionFilterOptions>>(
        "/filter-options",
      );

    return unwrap(response);
  },
  async getSessions(params: SessionsParams = {}): Promise<SessionsResponse> {
    const response = await httpClient.get<SessionsResponse>("/sessions", {
      params: {
        date: params.date,
        "venues[]": params.venues,
        "formats[]": params.formats,
        "languages[]": params.languages,
        "timeBands[]": params.timeBands,
        sort: params.sort,
        page: params.page,
      },
    });

    return response.data;
  },
  async getSession(sessionId: number): Promise<SessionDetails> {
    const response = await httpClient.get<DataEnvelope<SessionDetails>>(
      `/sessions/${sessionId}`,
    );

    return unwrap(response);
  },

  async getSeatMap(sessionId: number): Promise<SessionSeatMap> {
    const response = await httpClient.get<DataEnvelope<SessionSeatMap>>(
      `/sessions/${sessionId}/seats`,
    );

    return unwrap(response);
  },
};
