import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/authStore";
import { profileApi } from "./profileApi";
import type { UpdateProfilePayload } from "./profile.types";
import { authKeys } from "@/features/auth/authQueries";
import { toast } from "sonner";

const profileKeys = {
  all: ["profile"] as const,
  venues: () => [...profileKeys.all, "venues"] as const,
};

export function useVenuesQuery() {
  return useQuery({
    queryKey: profileKeys.venues(),
    queryFn: profileApi.getVenues,
    staleTime: 10 * 60 * 1000,
  });
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();
  const updateUser = useAuthStore((state) => state.updateUser);

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      profileApi.updateProfile(payload),

    onSuccess: async (user) => {
      updateUser(user);
      queryClient.setQueryData(authKeys.me(), user);
      toast.success("Profile updated.");
    },
  });
}
