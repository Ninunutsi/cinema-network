import { z } from "zod";

export const AVATAR_MAX_SIZE_BYTES = 2 * 1024 * 1024;
export const AVATAR_ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

const emailField = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Enter a valid email address");

const newPasswordField = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(64, "Password must be at most 64 characters")
  .regex(/[a-z]/, "Password must contain a lowercase letter")
  .regex(/[A-Z]/, "Password must contain an uppercase letter")
  .regex(/\d/, "Password must contain a number");

const avatarField = z
  .instanceof(File)
  .refine(
    (file) => file.size <= AVATAR_MAX_SIZE_BYTES,
    "Avatar must be 2MB or smaller",
  )
  .refine(
    (file) => (AVATAR_ACCEPTED_TYPES as readonly string[]).includes(file.type),
    "Avatar must be a JPG, PNG or WebP image",
  )
  .optional();

export const loginSchema = z.object({
  email: emailField,
  // No strength rules on login: only require that something was entered.
  password: z.string().min(1, "Password is required"),
});

export const signUpSchema = z
  .object({
    avatar: avatarField,
    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be at most 20 characters")
      .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers and underscores"),
    email: emailField,
    password: newPasswordField,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;
