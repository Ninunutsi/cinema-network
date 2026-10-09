import type { AxiosResponse } from "axios";

/** Every successful API response wraps its payload as `{ data: ... }`. */
export interface DataEnvelope<T> {
  data: T;
}

export function unwrap<T>(response: AxiosResponse<DataEnvelope<T>>): T {
  return response.data.data;
}
