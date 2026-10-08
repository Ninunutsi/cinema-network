import type { ButtonHTMLAttributes } from "react";
import HeldVector from "../../assets/held-vector.svg?react";

export type SeatVariant = "available" | "selected" | "held" | "sold";

type VariantConfig = {
  container: string;
  text: string;
  isInteractive: boolean;
  showHeldVector: boolean;
  statusText?: string;
};

const SEAT_VARIANTS: Record<SeatVariant, VariantConfig> = {
  available: {
    container:
      "border border-subtle bg-background-tint shadow-md cursor-pointer",
    text: "text-white",
    isInteractive: true,
    showHeldVector: false,
  },
  selected: {
    container: "border border-background bg-danger cursor-pointer",
    text: "text-white",
    isInteractive: true,
    showHeldVector: false,
  },
  held: {
    container: "bg-background-tint cursor-not-allowed",
    text: "text-muted",
    isInteractive: false,
    showHeldVector: true,
    statusText: "held by someone else",
  },
  sold: {
    container: "bg-background-tint cursor-not-allowed",
    text: "text-subtle",
    isInteractive: false,
    showHeldVector: false,
    statusText: "sold",
  },
};

const BASE_CONTAINER =
  "relative flex w-13 h-13 shrink-0 items-center justify-center overflow-hidden rounded-[10px]";
const BASE_TEXT =
  "font-sans text-[18px] font-extrabold leading-none tracking-normal select-none";

type SeatProps = {
  label: string; // "7"
  code: string; // "E7", used for accessibility
  variant?: SeatVariant;
  onSelect?: () => void;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onSelect">;

const Seat = ({
  label,
  code,
  variant = "available",
  onSelect,
  className = "",
  ...rest
}: SeatProps) => {
  const config = SEAT_VARIANTS[variant];

  return (
    <button
      type="button"
      disabled={!config.isInteractive}
      aria-pressed={variant === "selected"}
      aria-label={`Seat ${code}${config.statusText ? `, ${config.statusText}` : ""}`}
      onClick={onSelect}
      className={`${BASE_CONTAINER} ${config.container} ${className}`}
      {...rest}
    >
      {config.showHeldVector && <HeldVector className="absolute" />}
      <span className={`${BASE_TEXT} ${config.text}`}>{label}</span>
    </button>
  );
};

export default Seat;
