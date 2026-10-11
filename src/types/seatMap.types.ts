type SeatState = "available" | "sold" | "held" | "unavailable";

export type ApiSeat = {
  id: number;
  code: string;
  label: string;
  state: SeatState;
  aisleAfter: boolean;
  isMine: boolean;
};

export type ApiRow = {
  label: string;
  seats: ApiSeat[];
};

export type ApiSection = {
  name: string;
  rows: ApiRow[];
};
