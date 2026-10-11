import { Link } from "react-router-dom";
import Ticket from "@/assets/ticket.svg?react";
import { Button } from "@/components/ui/button";

interface SliderActionsProps {
  ticketsUrl: string;
  sessionsUrl: string;
}

const baseButton =
  "flex h-10.5 w-36 cursor-pointer items-center gap-1 rounded-full px-5.5 py-3 font-sans text-sm font-extrabold leading-none tracking-normal text-white";

const SliderActions = ({ ticketsUrl, sessionsUrl }: SliderActionsProps) => (
  <div className="pointer-events-auto flex items-center gap-2.5">
    <Button
      variant="link"
      className={`${baseButton} bg-danger hover:bg-danger`}
    >
      <Link to={ticketsUrl} className="items-center gap-1 flex">
        <Ticket aria-hidden="true" />
        Buy tickets
      </Link>
    </Button>

    <Button
      variant="link"
      className={`${baseButton} bg-white/10 hover:bg-white/10`}
    >
      <Link to={sessionsUrl}>All sessions</Link>
    </Button>
    {/* <Button className="flex h-10.5 w-36 cursor-pointer items-center gap-1 rounded-full bg-danger px-5.5 py-3 font-sans text-sm font-extrabold leading-none tracking-normal text-white hover:bg-danger">
      <Ticket />
      Buy tickets
    </Button>
    <Button className="flex h-10.5 w-36 cursor-pointer items-center gap-1 rounded-full bg-white/10 px-5.5 py-3 font-sans text-sm font-extrabold leading-none tracking-normal text-white hover:bg-white/10">
      All sessions
    </Button> */}
  </div>
);

export default SliderActions;
