import HeldVector from "../../assets/held-vector.svg?react";

type SeatStatusVariant = "available" | "selected" | "sold" | "held";

type SeatStatusProps = {
  variant: SeatStatusVariant;
};

const seatStatusConfig = {
  available: {
    label: "Available",
    boxClassName: "border border-subtle bg-background-tint",
  },
  selected: {
    label: "Selected",
    boxClassName: "bg-danger",
  },
  sold: {
    label: "Sold",
    boxClassName: "bg-background-tint",
  },
  held: {
    label: "Held by another user",
    boxClassName: "bg-background-tint",
  },
} satisfies Record<SeatStatusVariant, { label: string; boxClassName: string }>;

const SeatStatus = ({ variant }: SeatStatusProps) => {
  const { label, boxClassName } = seatStatusConfig[variant];

  return (
    <div className="flex items-center gap-2">
      <div
        className={`relative h-4 w-4 shrink-0 overflow-hidden rounded-[5px] ${boxClassName}`}
        aria-hidden="true"
      >
        {variant === "held" && (
          <HeldVector className="absolute inset-0 h-full w-full" />
        )}
      </div>

      <p className="font-sans text-xs font-normal leading-[130%] tracking-normal text-muted">
        {label}
      </p>
    </div>
  );
};

export default SeatStatus;
