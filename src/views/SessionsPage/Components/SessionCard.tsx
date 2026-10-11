import Ticket from "../../../assets/ticket.svg?react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import type { Session } from "../../../features/sessions/sessions.types";

interface SessionCardProps {
  session: Session;
  onMovieClick: () => void;
}

export const SessionCard = ({ session, onMovieClick }: SessionCardProps) => {
  const { time, format, language, hall, seatsLeft, price } = session;

  return (
    <Button
      variant="ghost"
      onClick={onMovieClick}
      disabled={session.isSoldOut}
      className="flex h-26 w-63 shrink-0 cursor-pointer flex-col gap-1.5 rounded-2xl bg-surface p-3.75 hover:bg-surface! disabled:cursor-not-allowed disabled:opacity-50"
    >
      <div className="flex w-full flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[18px] leading-none font-extrabold text-white">
            {time}
          </p>

          <Badge className="w-fit bg-surface-secondary px-2 py-1 font-sans text-xs leading-none font-semibold text-white">
            {format.name}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start gap-2">
            <span className="text-xs leading-[130%] font-normal text-muted">
              {language.name}
            </span>

            <span className="text-xs leading-none font-semibold text-white">
              {hall.venue.name} · Hall {hall.name}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span
              className={`flex items-center gap-1 text-xs leading-none ${
                session.isSoldOut
                  ? "font-normal text-muted"
                  : seatsLeft <= 5
                    ? "font-semibold text-danger"
                    : "font-semibold text-success"
              }`}
            >
              {!session.isSoldOut && <Ticket className="size-3" />}
              {session.isSoldOut ? "Sold out" : `${seatsLeft} Left`}
            </span>

            <span className="text-sm leading-none font-semibold text-white">
              ₾ {price}
            </span>
          </div>
        </div>
      </div>
    </Button>
  );
};
