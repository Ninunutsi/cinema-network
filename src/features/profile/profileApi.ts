import { unwrap, type DataEnvelope } from "../../api/api.types";
import { httpClient } from "../../api/httpclient";
import type { AuthUser, PreferredVenue } from "../auth/types";
import type { UpdateProfilePayload } from "./profile.types";

export const profileApi = {
  async updateProfile(payload: UpdateProfilePayload): Promise<AuthUser> {
    const response = await httpClient.put<DataEnvelope<AuthUser>>(
      "/profile",
      payload,
    );

    return unwrap(response);
  },

  async getVenues(): Promise<PreferredVenue[]> {
    const response =
      await httpClient.get<DataEnvelope<PreferredVenue[]>>("/venues");

    return unwrap(response);
  },
};
