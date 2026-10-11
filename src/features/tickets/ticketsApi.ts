import { unwrap, type DataEnvelope } from "../../api/api.types";
import { httpClient } from "../../api/httpclient";
import type { TicketOrder, TicketsFilter } from "./types";

export const ticketsApi = {
  async getTickets(filter?: TicketsFilter): Promise<TicketOrder[]> {
    const response = await httpClient.get<DataEnvelope<TicketOrder[]>>(
      "/tickets",
      {
        params: filter ? { filter } : undefined,
      },
    );

    return unwrap(response);
  },

  async refundOrder(orderId: number): Promise<TicketOrder> {
    const response = await httpClient.post<DataEnvelope<TicketOrder>>(
      `/orders/${orderId}/refund`,
    );

    return unwrap(response);
  },
};
