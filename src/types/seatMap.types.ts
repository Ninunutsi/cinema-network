export type SeatState = "available" | "sold" | "held" | "unavailable";

export type ApiSeat = {
  id: number; // send this as seatId when holding
  code: string; // "E7": show in summary/ticket
  label: string; // "7": show inside the button
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

export type SeatMapResponse = {
  data: {
    sessionId: number;
    hall: {
      id: number;
      name: string;
      venue: { id: number; slug: string; name: string; city: string };
    };
    sections: ApiSection[];
  };
};
