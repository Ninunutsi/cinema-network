export type AuthMode = "login" | "signup";

export interface VenueFormat {
  id: number;
  slug: string;
  name: string;
  priceUplift: number;
}

export interface PreferredVenue {
  id: number;
  slug: string;
  name: string;
  city: string;
  formats: VenueFormat[];
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
  fullName: string | null;
  mobileNumber: string | null;
  dateOfBirth: string | null;
  age: number | null;
  preferredVenue: PreferredVenue | null;
  profileComplete: boolean;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  avatar?: File;
}
