import type { AxiosResponse } from "axios";

export interface DataEnvelope<T> {
  data: T;
}

export function unwrap<T>(response: AxiosResponse<DataEnvelope<T>>): T {
  return response.data.data;
}
