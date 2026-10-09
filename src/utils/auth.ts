import type {
  AuthSession,
  LoginPayload,
  SignUpPayload,
} from "../types/auth.types";

const API_BASE_URL: string = import.meta.env.VITE_API_URL ?? "/api";

const DEFAULT_ERROR_MESSAGE = "Something went wrong. Please try again.";

const STATUS_MESSAGES: Record<number, string> = {
  400: "Please check the information you entered.",
  401: "Incorrect email or password.",
  409: "An account with this email or username already exists.",
  413: "The uploaded file is too large.",
  429: "Too many attempts. Please wait a moment and try again.",
  500: "Server error. Please try again later.",
};

interface ErrorResponseBody {
  message?: string;
  /** Optional per-field errors, e.g. { email: "Already taken" } */
  errors?: Record<string, string>;
}

export class AuthApiError extends Error {
  readonly status: number;
  readonly fieldErrors: Record<string, string>;

  constructor(
    message: string,
    status: number,
    fieldErrors: Record<string, string> = {},
  ) {
    super(message);
    this.name = "AuthApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

async function request<T>(path: string, init: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, init);
  } catch {
    throw new AuthApiError(
      "Unable to reach the server. Check your connection and try again.",
      0,
    );
  }

  if (!response.ok) {
    const body = (await response
      .json()
      .catch(() => null)) as ErrorResponseBody | null;

    throw new AuthApiError(
      body?.message ??
        STATUS_MESSAGES[response.status] ??
        DEFAULT_ERROR_MESSAGE,
      response.status,
      body?.errors,
    );
  }

  return (await response.json()) as T;
}

export const authApi = {
  login(payload: LoginPayload): Promise<AuthSession> {
    return request<AuthSession>("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  },

  signUp({ avatar, ...fields }: SignUpPayload): Promise<AuthSession> {
    // multipart/form-data so the avatar file can be sent with the fields.
    // Don't set Content-Type manually: the browser adds the boundary.
    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) =>
      formData.append(key, value),
    );
    if (avatar) formData.append("avatar", avatar);

    return request<AuthSession>("/auth/register", {
      method: "POST",
      body: formData,
    });
  },
};
