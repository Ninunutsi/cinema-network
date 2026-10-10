import { unwrap, type DataEnvelope } from "../../api/api.types";
import { httpClient } from "../../api/httpclient";
import type {
  SessionFilterOptions,
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
};
