import type { ReactNode } from "react";

export type TicketDetail = {
  label: string;
  value: ReactNode;
};

const TicketDetailRow = ({ label, value }: TicketDetail) => (
  <div className="flex items-center justify-between gap-3">
    <p className="font-sans text-xs font-normal leading-[130%] text-muted">
      {label}
    </p>
    <p className="font-sans text-xs font-semibold leading-none text-white">
      {value}
    </p>
  </div>
);

export default TicketDetailRow;
