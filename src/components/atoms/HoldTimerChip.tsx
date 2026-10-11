import { useCountdown } from "../../hooks/useCountdown";

interface HoldTimerChipProps {
  seconds: number;
  onExpire: () => void;
}

const HoldTimerChip = ({ seconds, onExpire }: HoldTimerChipProps) => {
  const { formatted } = useCountdown(seconds, { onComplete: onExpire });

  return (
    <div className="flex h-11.5 w-25.5 flex-col items-center justify-center gap-0.5 rounded-xl bg-background-tint px-3.5 py-2">
      <p className="font-sans text-xs font-semibold leading-none tracking-normal text-muted">
        SEATS HELD
      </p>
      <p className="font-sans text-sm font-extrabold leading-none tracking-normal text-white">
        {formatted}
      </p>
    </div>
  );
};

export default HoldTimerChip;
