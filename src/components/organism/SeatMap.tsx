import SeatSection from "./SeatSection";
import type { ApiSeat, ApiSection } from "../../types/seatMap.types";
import { useSeatsStore } from "../../store/SeatsStore";

type SeatMapProps = { sections: ApiSection[] };

const SeatMap = ({ sections }: SeatMapProps) => {
  const selectedIds = useSeatsStore((s) => s.selectedIds);
  const toggleSeat = useSeatsStore((s) => s.toggleSeat);

  const handleSeatSelect = (seat: ApiSeat) => toggleSeat(seat.id);

  return (
    <div className="flex flex-col items-center gap-6">
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
