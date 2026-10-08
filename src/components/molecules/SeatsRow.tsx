import { Fragment } from "react";
import type { ApiRow, ApiSeat } from "../../types/seatMap.types";
import type { SeatVariant } from "../atoms/SingleSeat";
import Seat from "../atoms/SingleSeat";

type SeatRowProps = {
  row: ApiRow;
  selectedIds: number[];
  onSeatSelect: (seat: ApiSeat) => void;
};

const getVariant = (seat: ApiSeat, isSelected: boolean): SeatVariant => {
  if (isSelected) return "selected";
  if (seat.state === "sold") return "sold";
  if (seat.state === "held") return "held";
  return "available";
};

const SeatRow = ({ row, selectedIds, onSeatSelect }: SeatRowProps) => {
  return (
    <div
      className="flex items-center gap-2"
      role="group"
      aria-label={`Row ${row.label}`}
    >
      {/* Label comes from data, never from the array index */}
      <span className="w-6 shrink-0 text-center font-sans text-[18px] font-extrabold text-muted">
        {row.label}
      </span>

      {row.seats.map((seat) => (
        <Fragment key={seat.id}>
          {seat.state === "unavailable" ? (
            // no seat here: keep the grid aligned, draw no button
            <div className="w-13 h-13 shrink-0" aria-hidden="true" />
          ) : (
            <Seat
              label={seat.label}
              code={seat.code}
              variant={getVariant(seat, selectedIds.includes(seat.id))}
              onSelect={() => onSeatSelect(seat)}
            />
          )}

          {seat.aisleAfter && (
            <span className="w-6 shrink-0" aria-hidden="true" />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default SeatRow;
