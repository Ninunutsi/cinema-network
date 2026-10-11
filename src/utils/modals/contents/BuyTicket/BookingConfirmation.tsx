import { Check } from "lucide-react";
import type { Order } from "../../../../features/booking/booking.types";
import TicketCard from "../../../../components/molecules/TicketCard";
import { Button } from "../../../../components/ui/button";
import { formatGel } from "./buy-ticket.utils";

interface BookingConfirmationProps {
  order: Order;
  onViewTickets: () => void;
  onClose: () => void;
}

const BookingConfirmation = ({
  order,
  onViewTickets,
  onClose,
}: BookingConfirmationProps) => {
  const { session, tickets, totalPrice, reference } = order;

  return (
    <div className="flex flex-col gap-6 p-5 text-white min-h-150 w-276.5">
      <div className="flex flex-col gap-4.5">
        <div className="m-auto flex w-full max-w-91.25 flex-col items-center justify-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-[28px] bg-success">
            <Check className="text-white" />
          </div>

          <div className="flex flex-col gap-2.5">
            <h1 className="text-center font-sans text-2xl leading-none font-extrabold">
              Booking confirmed!
            </h1>

            <p className="text-center font-sans text-sm leading-[130%] text-muted">
              Your tickets are ready. We've sent the confirmation to your email.
            </p>
          </div>

          <div className="flex h-6.5 items-center justify-center rounded-full bg-surface-secondary px-4 font-sans text-xs leading-none font-semibold">
            ORDER #{reference}
          </div>
        </div>

        <TicketCard
          className="m-auto w-full max-w-168.25 rounded-xl p-5"
          posterSrc={session.movie.posterUrl}
          title={session.movie.title}
          subtitle={`${session.venue.name} · Hall ${session.hall.name} · ${session.date} · ${session.time}`}
          details={[
            {
              label: "Seats",
              value: tickets.map((ticket) => ticket.seatCode).join(", "),
            },
            {
              label: "Tickets",
              value: tickets
                .map((ticket) => `${ticket.ticketType.name} × 1`)
                .join(", "),
            },
          ]}
          footer={
            <div className="flex items-center justify-between">
              <p className="font-sans text-xs leading-[130%] text-muted">
                TOTAL PAID
              </p>

              <p className="font-sans text-lg leading-none font-semibold text-white">
                {formatGel(totalPrice)}
              </p>
            </div>
          }
        />
      </div>

      <div className="flex items-center justify-center gap-3">
        <Button
          type="button"
          onClick={onViewTickets}
          className="h-10.25 w-38.5 cursor-pointer rounded-full bg-danger px-3.25 font-sans text-sm leading-none font-extrabold text-white hover:bg-danger"
        >
          View my tickets
        </Button>

        <Button
          type="button"
          onClick={onClose}
          className="h-10.25 w-38.5 cursor-pointer rounded-full bg-background-tint px-3.25 font-sans text-sm leading-none font-extrabold text-white hover:bg-background-tint"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
