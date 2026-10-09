import axios from "axios";

const NETWORK_ERROR_MESSAGE =
  "Unable to reach the server. Check your connection and try again.";
const DEFAULT_ERROR_MESSAGE = "Something went wrong. Please try again.";

interface ErrorResponseBody {
  message?: string;
  errors?: Record<string, string[]>;
}

/** The only error type the rest of the app has to deal with. */
export class ApiError extends Error {
  /** HTTP status, or 0 when the server could not be reached. */
  readonly status: number;
  /** First validation message per field, from a 422 response. */
  readonly fieldErrors: Record<string, string>;

  constructor(
    message: string,
    status: number,
    fieldErrors: Record<string, string> = {},
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

function firstMessagePerField(
  errors: ErrorResponseBody["errors"],
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [field, messages] of Object.entries(errors ?? {})) {
    if (messages[0]) result[field] = messages[0];
  }
  return result;
}

/** Normalizes anything thrown by axios (or elsewhere) into an ApiError. */
export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;
  if (!axios.isAxiosError(error)) return new ApiError(DEFAULT_ERROR_MESSAGE, 0);
  if (!error.response) return new ApiError(NETWORK_ERROR_MESSAGE, 0);

  const { status, data } = error.response;
  const body: ErrorResponseBody | undefined =
    typeof data === "object" && data !== null ? data : undefined;

  return new ApiError(
    body?.message ?? DEFAULT_ERROR_MESSAGE,
    status,
    firstMessagePerField(body?.errors),
  );
}
