import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import type { TicketDetail } from "@/components/atoms/TicketDetailRow";
import TicketDetailRow from "@/components/atoms/TicketDetailRow";

type TicketCardProps = {
  title: string;
  subtitle: string;
  details: TicketDetail[];
  posterSrc?: string; // renders the poster column when provided
  footer?: ReactNode; // e.g. total paid row
  className?: string;
};

const TicketCard = ({
  title,
  subtitle,
  details,
  posterSrc,
  footer,
  className,
}: TicketCardProps) => (
  <div className={cn("flex flex-col gap-3 bg-surface", className)}>
    <div className="flex items-start gap-2.5">
      {posterSrc && (
        <img
          src={posterSrc}
          alt={title}
          className="h-16 w-12 rounded-lg border border-white object-cover"
        />
      )}
      <div className="flex flex-col gap-2">
        <h2 className="font-sans text-sm font-extrabold leading-none text-white">
          {title}
        </h2>
        <p className="font-sans text-xs font-normal leading-[130%] text-muted">
          {subtitle}
        </p>
      </div>
    </div>

    <Separator className="bg-surface-secondary" />

    {details.map((detail) => (
      <TicketDetailRow key={detail.label} {...detail} />
    ))}

    {footer && (
      <>
        <Separator className="bg-surface-secondary" />
        {footer}
      </>
    )}
  </div>
);

export default TicketCard;
