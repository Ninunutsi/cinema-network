import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ticketsApi } from "./ticketsApi";
import type { TicketsFilter } from "./types";

export const ticketKeys = {
  all: ["tickets"] as const,
  lists: () => [...ticketKeys.all, "list"] as const,
  list: (filter?: TicketsFilter) =>
    [...ticketKeys.lists(), filter ?? "all"] as const,
};

export function useTicketsQuery(filter?: TicketsFilter) {
  return useQuery({
    queryKey: ticketKeys.list(filter),
    queryFn: () => ticketsApi.getTickets(filter),
    staleTime: 60 * 1000,
  });
}

export function useRefundOrderMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderReference: string) =>
      ticketsApi.refundOrder(orderReference),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ticketKeys.all,
      });
    },
  });
}
