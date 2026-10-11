import { useMutation } from "@tanstack/react-query";
import type { CreateHoldRequest, CreateOrderRequest } from "./booking.types";
import { createOrder, createSeatHold } from "./bookingApi";
import { toast } from "sonner";

const bookingKeys = {
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

export const useCreateOrderMutation = () => {
  return useMutation({
    mutationFn: (payload: CreateOrderRequest) => createOrder(payload),
    onSuccess: () =>
      toast.success("Payment successful. Your tickets are booked!"),
  });
};
