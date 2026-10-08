import type { ApiSeat, ApiSection } from "../../types/seatMap.types";
import SeatRow from "../molecules/SeatsRow";

type SeatSectionProps = {
  section: ApiSection;
  selectedIds: number[];
  onSeatSelect: (seat: ApiSeat) => void;
};

const SeatSection = ({
  section,
  selectedIds,
  onSeatSelect,
}: SeatSectionProps) => (
  <section
    className="flex flex-col items-center gap-3"
    aria-label={section.name}
  >
    <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-muted">
      {section.name}
    </h3>

    <div className="flex flex-col gap-2">
      {section.rows.map((row) => (
        <SeatRow
          key={row.label}
          row={row}
          selectedIds={selectedIds}
          onSeatSelect={onSeatSelect}
        />
      ))}
    </div>
  </section>
);

export default SeatSection;
