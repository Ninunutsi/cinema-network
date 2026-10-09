import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { AuthApiError } from "./auth";

const UNEXPECTED_ERROR_MESSAGE = "Something went wrong. Please try again.";

/**
 * Maps any error thrown while submitting an auth form onto the form:
 * field-level errors go to their inputs, everything else to `errors.root.serverError`.
 */
export function applyAuthError<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
): void {
  const rootPath = "root.serverError" as Path<T>;

  if (!(error instanceof AuthApiError)) {
    setError(rootPath, { type: "unknown", message: UNEXPECTED_ERROR_MESSAGE });
    return;
  }

  const fieldEntries = Object.entries(error.fieldErrors);

  if (fieldEntries.length === 0) {
    setError(rootPath, { type: String(error.status), message: error.message });
    return;
  }

  fieldEntries.forEach(([field, message]) => {
    setError(field as Path<T>, { type: "server", message });
  });
}
