import { z } from "zod";
import { getAge, isValidCalendarDate, getTodayDate } from "./profile.utils";

export const profileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must not exceed 50 characters"),

  email: z.string().email("Please enter a valid email"),

  mobileNumber: z.string().superRefine((value, ctx) => {
    if (!value) {
      ctx.addIssue({
        code: "custom",
        message: "Mobile number is required",
      });
      return;
    }

    if (!/^\d+$/.test(value)) {
      ctx.addIssue({
        code: "custom",
        message:
          "Please enter a valid Georgian mobile number (9 digits starting with 5)",
      });
      return;
    }

    if (!value.startsWith("5")) {
      ctx.addIssue({
        code: "custom",
        message: "Georgian mobile numbers must start with 5",
      });
      return;
    }

    if (value.length !== 9) {
      ctx.addIssue({
        code: "custom",
        message: "Mobile number must be exactly 9 digits",
      });
    }
  }),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine(
      (value) =>
        !value || (isValidCalendarDate(value) && value <= getTodayDate()),
      "Please enter a valid date of birth",
    )
    .refine(
      (value) => !value || !isValidCalendarDate(value) || getAge(value) >= 12,
      "You must be at least 12 years old to create an account",
    ),

  preferredVenue: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
