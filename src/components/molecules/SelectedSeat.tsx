import { Button } from "@base-ui/react";
import { X } from "lucide-react";
import type {
  SelectedSeatView,
  TicketOption,
} from "../../utils/modals/contents/BuyTicket/buy-tickets.types";
import type { TicketType } from "../../features/booking/booking.types";
import { formatGel } from "../../utils/modals/contents/BuyTicket/buy-ticket.utils";
import { Separator } from "../ui/separator";

interface SelectedSeatProps {
  seat: SelectedSeatView;
  ticketOptions: TicketOption[];
  onTicketTypeChange: (type: TicketType) => void;
  onRemove: () => void;
}

const optionClass = (isActive: boolean) =>
  [
    "flex h-8 flex-1 cursor-pointer items-center justify-center gap-0.5 rounded-2xl py-2",
    "font-sans text-xs font-normal leading-[130%] tracking-normal text-white",
    isActive ? "bg-danger" : "bg-surface-secondary",
  ].join(" ");

const SelectedSeat = ({
  seat,
  ticketOptions,
  onTicketTypeChange,
  onRemove,
}: SelectedSeatProps) => (
  <div className="flex min-h-25.75 w-80.25 flex-col gap-1.5 rounded-2xl bg-surface p-3.75">
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="font-sans text-xs font-normal leading-[130%] tracking-normal text-muted">
            Seat
          </p>
          <p className="font-sans text-xs font-semibold leading-none tracking-normal text-white">
            {seat.code}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-sans text-xs font-semibold leading-none tracking-normal text-white">
            {formatGel(seat.price)}
          </span>
          <button
            type="button"
            aria-label={`Remove seat ${seat.code}`}
            onClick={onRemove}
            className="cursor-pointer text-muted"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <Separator className="bg-subtle" />

      <div className="flex items-center gap-2">
        {ticketOptions.map((option) => (
          <Button
            key={option.slug}
            onClick={() => onTicketTypeChange(option.slug)}
            className={optionClass(option.slug === seat.ticketType)}
          >
            {option.name} {option.percent}%
          </Button>
        ))}
      </div>

      {seat.issue && (
        <p
          role="alert"
          className="font-sans text-xs leading-[130%] text-danger"
        >
          {seat.code}: {seat.issue}
        </p>
      )}
    </div>
  </div>
);

export default SelectedSeat;
