import { useMutation, useQuery } from "@tanstack/react-query";
import type { CreateHoldRequest, CreateOrderRequest } from "./booking.types";
import {
  createOrder,
  createSeatHold,
  getSeatHold,
  releaseSeatHold,
} from "./bookingApi";

export const bookingKeys = {
  all: ["booking"] as const,
  holds: () => [...bookingKeys.all, "holds"] as const,
  hold: (holdId: string) => [...bookingKeys.holds(), holdId] as const,
};

export const useCreateSeatHoldMutation = (sessionId: number) => {
  return useMutation({
    mutationFn: (payload: CreateHoldRequest) =>
      createSeatHold(sessionId, payload),
  });
};

export const useSeatHoldQuery = (holdId: string | null) => {
  return useQuery({
    queryKey: holdId
      ? bookingKeys.hold(holdId)
      : [...bookingKeys.holds(), "empty"],
    queryFn: () => getSeatHold(holdId!),
    enabled: Boolean(holdId),
    retry: false,
  });
};

export const useReleaseSeatHoldMutation = () => {
  return useMutation({
    mutationFn: (holdId: string) => releaseSeatHold(holdId),
  });
};

export const useCreateOrderMutation = () => {
  return useMutation({
    mutationFn: (payload: CreateOrderRequest) => createOrder(payload),
  });
};
