import TktPerf from "../../../assets/ticket-perforation.svg?react";
import Ticket from "../../../assets/ticket.svg?react";
import type { MovieSessionsByVenue } from "../../../features/movies/movies.types";

interface SessionTicketCardProps {
  session: MovieSessionsByVenue["sessions"][number];
  isUnderAge: boolean;
}

export const SessionTicketCard = ({
  session,
  isUnderAge,
}: SessionTicketCardProps) => {
  const disabled = session.isSoldOut || session.seatsLeft === 0 || isUnderAge;

  return (
    <div className="flex h-33.25 flex-col gap-2.25 rounded-[18px] bg-background-tint p-3.75">
      <span className="text-xs font-semibold leading-none text-white">
        Hall {session.hall.name}
      </span>

      <button
        type="button"
        disabled={disabled}
        aria-label={`Hall ${session.hall.name}, ${session.time}, ${session.price} GEL`}
        className="relative h-20.25 w-[207px] overflow-hidden"
      >
        <div className="absolute left-[117px] top-[74px] size-3.5 rounded-full bg-background-tint" />
        <div className="absolute bottom-[74px] left-[117px] size-3.5 rounded-full bg-background-tint" />

        <TktPerf className="absolute left-30.75 top-2.5" />

        <div className="flex h-full w-full justify-between gap-2 rounded-xl bg-background">
          <div className="flex h-20.25 w-31 min-w-0 flex-col gap-2 py-3.75">
            <h3 className="text-[20px] font-extrabold leading-none text-white">
              {session.time}
            </h3>

            <div className="flex items-center justify-center gap-1.5 text-xs text-muted">
              <span>{session.language.code}</span>

              <span className="max-w-17.5 truncate rounded-full bg-background-tint px-3 py-1 text-xs">
                {session.format.name}
              </span>
            </div>
          </div>

          <div className="flex h-20.25 w-20.75 min-w-0 flex-col gap-2.5 py-3.75">
            <h3 className="h-5 text-lg font-extrabold leading-none text-danger">
              ₾ {session.price}
            </h3>

            <span className="flex items-start justify-center gap-1 text-xs leading-[130%] text-muted">
              <Ticket className="size-3 fill-muted" />
              {session.seatsLeft} left
            </span>
          </div>
        </div>
      </button>
    </div>
  );
};
