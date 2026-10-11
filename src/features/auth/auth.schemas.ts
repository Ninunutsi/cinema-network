import { z } from "zod";

const MIN_PASSWORD_LENGTH = 3;
const MIN_USERNAME_LENGTH = 3;
const AVATAR_MAX_SIZE_BYTES = 2 * 1024 * 1024;
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

const passwordField = z
  .string()
  .min(1, "Password is required")
  .min(
    MIN_PASSWORD_LENGTH,
    `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
  );

const avatarField = z
  .instanceof(File)
  .refine(
    (file) => (AVATAR_ACCEPTED_TYPES as readonly string[]).includes(file.type),
    "Avatar must be a JPG, PNG or WebP image",
  )
  .refine(
    (file) => file.size <= AVATAR_MAX_SIZE_BYTES,
    "Avatar must be 2MB or smaller",
  )
  .optional();

export const loginSchema = z.object({
  email: emailField,
  password: passwordField,
});

export const signUpSchema = z
  .object({
    avatar: avatarField,
    username: z
      .string()
      .trim()
      .min(1, "Username is required")
      .min(
        MIN_USERNAME_LENGTH,
        `Username must be at least ${MIN_USERNAME_LENGTH} characters`,
      ),
    email: emailField,
    password: passwordField,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;
