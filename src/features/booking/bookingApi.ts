import { httpClient } from "../../api/httpclient";
import type {
  CreateHoldRequest,
  CreateHoldResponse,
  CreateOrderRequest,
  CreateOrderResponse,
} from "./booking.types";

export const createSeatHold = async (
  sessionId: number,
  payload: CreateHoldRequest,
): Promise<CreateHoldResponse> => {
  const { data } = await httpClient.post<CreateHoldResponse>(
    `/sessions/${sessionId}/holds`,
    payload,
  );

  return data;
};

export const getSeatHold = async (
  holdId: string,
): Promise<CreateHoldResponse> => {
  const { data } = await httpClient.get<CreateHoldResponse>(`/holds/${holdId}`);

  return data;
};

export const releaseSeatHold = async (holdId: string): Promise<void> => {
  await httpClient.delete(`/holds/${holdId}`);
};

export const createOrder = async (
  payload: CreateOrderRequest,
): Promise<CreateOrderResponse> => {
  const { data } = await httpClient.post<CreateOrderResponse>(
    "/orders",
    payload,
  );

  return data;
};
