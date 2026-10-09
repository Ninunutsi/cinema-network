export type AuthMode = "login" | "signup";

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string | null;
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
  avatar?: File;
}
