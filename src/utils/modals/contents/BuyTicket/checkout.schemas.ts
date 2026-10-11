import { z } from "zod";
import type {
  BookingErrorResponse,
  CreateOrderRequest,
} from "@/features/booking/booking.types";

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters."),

  email: z.string().trim().email("Enter a valid email address."),

  mobileNumber: z
    .string()
    .regex(/^(?:\+?995)?5\d{8}$/, "Enter a valid Georgian mobile number."),

  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits."),

  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Enter a valid expiry date as MM/YY.")
    .refine((value) => {
      const [month, year] = value.split("/").map(Number);
      const now = new Date();

      return (
        new Date(2000 + year, month, 1) >
        new Date(now.getFullYear(), now.getMonth(), 1)
      );
    }, "Card expiry date must be in the future."),

  cvv: z.string().regex(/^\d{3}$/, "CVV must be 3 digits."),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
export type CheckoutField = keyof CheckoutFormValues;
export type CheckoutFieldErrors = Partial<Record<CheckoutField, string>>;

export const digitsOnly = (value: string, maxLength: number) =>
  value.replace(/\D/g, "").slice(0, maxLength);

export const formatExpiryInput = (value: string) => {
  const digits = digitsOnly(value, 4);

  return digits.length > 2
    ? `${digits.slice(0, 2)}/${digits.slice(2)}`
    : digits;
};

export const toCreateOrderRequest = (
  holdId: string,
  values: CheckoutFormValues,
): CreateOrderRequest => ({
  holdId,
  fullName: values.fullName.trim(),
  email: values.email.trim(),
  mobileNumber: values.mobileNumber.replace(/[\s-]/g, ""),
  cardNumber: values.cardNumber,
  expiry: values.expiry,
  cvv: values.cvv,
});

const SERVER_FIELD_TO_FORM_FIELD: Record<string, CheckoutField> = {
  fullName: "fullName",
  email: "email",
  mobileNumber: "mobileNumber",
  cardNumber: "cardNumber",
  expiryMonth: "expiry",
  expiryYear: "expiry",
  cvv: "cvv",
};

export const mapServerErrors = (
  errors: NonNullable<BookingErrorResponse["errors"]>,
): CheckoutFieldErrors => {
  const result: CheckoutFieldErrors = {};

  for (const [serverField, messages] of Object.entries(errors)) {
    const field = SERVER_FIELD_TO_FORM_FIELD[serverField];

    if (field && !result[field]) {
      result[field] = messages[0];
    }
  }

  return result;
};
