import SeatSection from "./SeatSection";
import type {
  ApiRow,
  ApiSeat,
  ApiSection,
  SeatMapResponse,
  SeatState,
} from "../../types/seatMap.types";
import { MAX_SEATS } from "../../hooks/useSeatSelection";
import { useSeatStore } from "../../store/seatStore";

let nextId = 93;

type RowConfig = {
  label: string;
  count: number;
  aisleAfter: number[]; // seat numbers (1-based) with a gangway to the right
  states?: Record<number, SeatState>; // seat number → state
  mine?: number[];
};

const buildRow = ({
  label,
  count,
  aisleAfter,
  states = {},
  mine = [],
}: RowConfig): ApiRow => ({
  label,
  seats: Array.from({ length: count }, (_, i) => {
    const n = i + 1;
    return {
      id: nextId++,
      code: `${label}${n}`,
      label: String(n),
      state: states[n] ?? "available",
      aisleAfter: aisleAfter.includes(n),
      isMine: mine.includes(n),
    };
  }),
});

const sections: ApiSection[] = [
  {
    name: "Front stalls",
    rows: [
      buildRow({ label: "A", count: 10, aisleAfter: [5] }),
      buildRow({
        label: "B",
        count: 10,
        aisleAfter: [5],
        states: { 3: "held" },
      }),
      buildRow({
        label: "C",
        count: 10,
        aisleAfter: [5],
        states: { 1: "sold", 3: "sold" },
      }),
    ],
  },
  {
    name: "Rear stalls",
    rows: [
      buildRow({
        label: "D",
        count: 14,
        aisleAfter: [4, 10],
        states: { 7: "unavailable" },
      }),
      buildRow({ label: "E", count: 14, aisleAfter: [4, 10], mine: [8, 9] }),
      buildRow({
        label: "G",
        count: 14,
        aisleAfter: [4, 10],
        states: { 1: "sold" },
      }),
    ],
  },
];

export const MOCK_SEAT_MAP: SeatMapResponse = {
  data: {
    sessionId: 1263,
    hall: {
      id: 2,
      name: "B",
      venue: {
        id: 1,
        slug: "galleria",
        name: "Galleria Tbilisi",
        city: "Tbilisi",
      },
    },
    sections,
  },
};

type SeatMapProps = { sections: ApiSection[] };

const SeatMap = ({ sections }: SeatMapProps) => {
  const selectedIds = useSeatStore((s) => s.selectedIds);
  const limitReached = useSeatStore((s) => s.limitReached);
  const toggleSeat = useSeatStore((s) => s.toggleSeat);

  const handleSeatSelect = (seat: ApiSeat) => toggleSeat(seat.id);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* <div className="flex flex-col items-center gap-1">
        <p className="font-sans text-sm font-bold text-muted">
          {selectedIds.length} / {MAX_SEATS} selected
        </p>
        <p
          role="status"
          className={`h-5 text-sm text-danger transition-opacity ${
            limitReached ? "opacity-100" : "opacity-0"
          }`}
        >
          You can select up to {MAX_SEATS} seats.
        </p>
      </div> */}

      <div className="max-w-full overflow-x-auto">
        <div className="mx-auto flex w-max flex-col gap-8">
          {sections.map((section) => (
            <SeatSection
              key={section.name}
              section={section}
              selectedIds={selectedIds}
              onSeatSelect={handleSeatSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeatMap;
