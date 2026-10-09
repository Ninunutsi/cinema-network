export const env = {
  apiUrl:
    (import.meta.env.VITE_API_URL as string | undefined) ??
    "https://api.kinoxii.redberryinternship.ge/api",
} as const;
