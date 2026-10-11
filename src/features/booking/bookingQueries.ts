import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import type { CreateHoldRequest, CreateOrderRequest } from "./booking.types";
import { createOrder, createSeatHold, getSeatHold } from "./bookingApi";

export const bookingKeys = {
  all: ["booking"] as const,
  holds: () => [...bookingKeys.all, "holds"] as const,
  hold: (holdId: string) => [...bookingKeys.holds(), holdId] as const,
};

export const useCreateSeatHoldMutation = (sessionId: number) =>
  useMutation({
    mutationFn: (payload: CreateHoldRequest) =>
      createSeatHold(sessionId, payload),
  });

export const useSeatHoldQuery = (holdId: string | undefined) =>
  useQuery({
    queryKey: bookingKeys.hold(holdId ?? ""),
    queryFn: () => {
      if (!holdId) {
        throw new Error("A hold ID is required.");
      }

      return getSeatHold(holdId);
    },
    enabled: Boolean(holdId),
    retry: false,
  });

export const useCreateOrderMutation = () =>
  useMutation({
    mutationFn: (payload: CreateOrderRequest) => createOrder(payload),
    onSuccess: () =>
      toast.success("Payment successful. Your tickets are booked!"),
  });
