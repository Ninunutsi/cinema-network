import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import type {
  LoginFormValues,
  SignUpFormValues,
} from "../schemas/auth.schemas";
import { ApiError } from "../../../api/errors/ApiError";
import type { SignUpPayload } from "../types/types";

const UNEXPECTED_ERROR_MESSAGE = "Something went wrong. Please try again.";

interface ApplyAuthErrorOptions<T extends FieldValues> {
  /** Form fields the API's field errors may be shown on. */
  fields: readonly Path<T>[];
  /** API field name -> form field name, where they differ. */
  aliases?: Record<string, Path<T>>;
}

export const LOGIN_ERROR_OPTIONS: ApplyAuthErrorOptions<LoginFormValues> = {
  fields: ["email", "password"],
};

export const SIGN_UP_ERROR_OPTIONS: ApplyAuthErrorOptions<SignUpFormValues> = {
  fields: ["avatar", "username", "email", "password", "confirmPassword"],
  aliases: { password_confirmation: "confirmPassword" },
};

/**
 * Puts an API error onto the form: field errors (422) go to their inputs,
 * everything else (wrong credentials, network, unknown fields) goes to
 * `errors.root.serverError`, which the form renders inside the modal.
 */
export function applyAuthError<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
  { fields, aliases = {} }: ApplyAuthErrorOptions<T>,
): void {
  const showOnForm = (message: string) =>
    setError("root.serverError" as Path<T>, { type: "server", message });

  if (!(error instanceof ApiError)) {
    showOnForm(UNEXPECTED_ERROR_MESSAGE);
    return;
  }

  const entries = Object.entries(error.fieldErrors);
  if (entries.length === 0) {
    showOnForm(error.message);
    return;
  }

  const unmatched: string[] = [];
  for (const [apiField, message] of entries) {
    const field = aliases[apiField] ?? (apiField as Path<T>);
    if (fields.includes(field)) {
      setError(field, { type: "server", message });
    } else {
      unmatched.push(message);
    }
  }

  if (unmatched.length > 0) showOnForm(unmatched.join(" "));
}

export function toSignUpPayload({
  confirmPassword,
  ...values
}: SignUpFormValues): SignUpPayload {
  return { ...values, passwordConfirmation: confirmPassword };
}
