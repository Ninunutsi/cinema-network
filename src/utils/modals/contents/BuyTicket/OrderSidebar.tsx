import { Button } from "@base-ui/react";
import type {
  HeldSeat,
  SeatHold,
  TicketType,
} from "../../../../features/booking/booking.types";
import type {
  BuyStep,
  SelectedSeatView,
  TicketOption,
} from "./buy-tickets.types";
import { formatGel } from "./buy-ticket.utils";

import SelectedSeat from "../../../../components/molecules/SelectedSeat";
import { MAX_SEATS } from "../../../../store/SeatStore";

const textClass = "font-sans leading-none tracking-normal text-white";

const HeldSeatRow = ({ seat }: { seat: HeldSeat }) => (
  <div className="flex w-80.25 items-center justify-between rounded-2xl bg-surface p-3.75">
    <div className="flex flex-col gap-1.5">
      <p className={`${textClass} text-xs font-semibold`}>Seat {seat.code}</p>
      <p className="font-sans text-xs text-muted">{seat.ticketType.name}</p>
    </div>
    <span className={`${textClass} text-xs font-semibold`}>
      {formatGel(seat.price)}
    </span>
  </div>
);

interface OrderSidebarProps {
  step: BuyStep;
  seats: SelectedSeatView[];
  ticketOptions: TicketOption[];
  hold: SeatHold | null;
  subtotal: number;
  notice: string | null;
  canProceed: boolean;
  isHolding: boolean;
  onTicketTypeChange: (seatId: number, type: TicketType) => void;
  onRemoveSeat: (seatId: number) => void;
  onProceed: () => void;
  onBack: () => void;
  onDismissNotice: () => void;
}

const OrderSidebar = ({
  step,
  seats,
  ticketOptions,
  hold,
  subtotal,
  notice,
  canProceed,
  isHolding,
  onTicketTypeChange,
  onRemoveSeat,
  onProceed,
  onBack,
  onDismissNotice,
}: OrderSidebarProps) => (
  <div className="flex min-w-0 flex-1 flex-col gap-3">
    <p className={`shrink-0 text-sm font-extrabold ${textClass}`}>
      {step === "seats" ? `Your seats · Max ${MAX_SEATS}` : "Order summary"}
    </p>

    {notice && (
      <button
        type="button"
        role="alert"
        onClick={onDismissNotice}
        className="cursor-pointer rounded-xl bg-danger/20 p-2.5 text-left font-sans text-xs leading-[130%] text-white"
      >
        {notice}
      </button>
    )}

    <div className="flex h-87.75 shrink-0 flex-col gap-3 overflow-y-auto overflow-x-hidden pr-1 scrollbar-thin">
      {step === "checkout" && hold ? (
        hold.seats.map((seat) => <HeldSeatRow key={seat.seatId} seat={seat} />)
      ) : seats.length === 0 ? (
        <p className="font-sans text-xs font-normal leading-[130%] text-muted">
          Pick up to {MAX_SEATS} seats from the map. Each seat can carry its own
          ticket type.
        </p>
      ) : (
        seats.map((seat) => (
          <SelectedSeat
            key={seat.seatId}
            seat={seat}
            ticketOptions={ticketOptions}
            onTicketTypeChange={(type) => onTicketTypeChange(seat.seatId, type)}
            onRemove={() => onRemoveSeat(seat.seatId)}
          />
        ))
      )}
    </div>

    <div className="flex min-h-0 flex-1 flex-col justify-end gap-3 pt-2.5">
      <div className="flex items-center justify-between px-1.25">
        <p className={`text-xs font-semibold ${textClass}`}>SUBTOTAL</p>
        <h1 className={`text-2xl font-extrabold ${textClass}`}>
          {formatGel(subtotal)}
        </h1>
      </div>

      {step === "seats" ? (
        <Button
          onClick={onProceed}
          disabled={!canProceed}
          className="flex h-10.25 w-full cursor-pointer items-center justify-center rounded-full bg-danger px-3.25 font-sans text-sm font-extrabold leading-none text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isHolding ? "Holding seats…" : "Next: Checkout"}
        </Button>
      ) : (
        <Button
          onClick={onBack}
          className="flex h-10.25 w-full cursor-pointer items-center justify-center rounded-full bg-surface px-3.25 font-sans text-sm font-semibold leading-none text-white"
        >
          Back to seats
        </Button>
      )}
    </div>
  </div>
);

export default OrderSidebar;
