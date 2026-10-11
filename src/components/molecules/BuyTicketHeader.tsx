import type { ReactNode } from "react";
import type { SessionDetails } from "../../features/sessions/sessions.types";
import { formatSessionDate } from "../../utils/modals/contents/BuyTicket/buy-ticket.utils";

interface BuyTicketHeaderProps {
  session: SessionDetails;
  timer?: ReactNode;
}

const BuyTicketHeader = ({ session, timer }: BuyTicketHeaderProps) => {
  const details = [
    session.venue.name,
    `Hall ${session.hall.name}`,
    formatSessionDate(session.date),
    session.time,
    session.format.name,
    session.language.name,
  ].join(" · ");

  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col gap-2">
        <h2 className="font-sans text-xl font-extrabold leading-none tracking-normal text-white">
          {session.movie.title.toUpperCase()}
        </h2>
        <p className="font-sans text-xs font-normal leading-[130%] tracking-normal text-muted">
          {details}
        </p>
      </div>
      {timer}
    </header>
  );
};

export default BuyTicketHeader;
