import SeatStatus from "@/components/atoms/SeatStatus";
import SeatMap from "@/components/organism/SeatMap";
import type { SessionSeatSection } from "@/features/sessions/sessions.types";
import ZoomableSeatMap from "./ZoomableSeatMap";

interface SeatsStepProps {
  sections: SessionSeatSection[];
}

const SeatsStep = ({ sections }: SeatsStepProps) => (
  <div className="flex h-full min-h-0 flex-col gap-3">
    <ZoomableSeatMap>
      <div className="flex w-max flex-col items-center gap-8 p-2">
        <div className="flex h-7.5 w-170 shrink-0 items-center justify-center rounded-b-[20px] bg-surface-secondary px-5">
          <p className="font-sans text-xs font-semibold leading-none tracking-normal text-white">
            SCREEN
          </p>
        </div>
        <SeatMap sections={sections} />
      </div>
    </ZoomableSeatMap>

    <div className="flex shrink-0 items-center justify-center gap-6">
      <SeatStatus variant="available" />
      <SeatStatus variant="selected" />
      <SeatStatus variant="sold" />
      <SeatStatus variant="held" />
    </div>
  </div>
);

export default SeatsStep;
