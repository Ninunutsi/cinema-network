import type { AuthUser, PreferredVenue } from "@/features/auth/types";

export type UserProfile = AuthUser;
export type Venue = PreferredVenue;

export interface UpdateProfilePayload {
  fullName: string;
  mobileNumber: string;
  dateOfBirth: string;
  preferredVenueId?: number;
}
