import type { ApiSeat, ApiSection } from "@/types/seatMap.types";
import SeatRow from "@/components/molecules/SeatsRow";

type SeatSectionProps = {
  section: ApiSection;
  selectedIds: number[];
  onSeatSelect: (seat: ApiSeat) => void;
};

const getSectionTitle = (section: ApiSection) => {
  const labels = section.rows.map((r) => r.label);
  if (labels.length === 0) return section.name;

  const first = labels[0];
  const last = labels[labels.length - 1];
  const range = first === last ? `ROW ${first}` : `ROWS ${first}-${last}`;

  return `${section.name} · ${range}`.toUpperCase();
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
    <h3 className="font-sans text-sm font-bold self-start uppercase tracking-wider text-muted select-none">
      {getSectionTitle(section)}
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
