import { X } from "lucide-react";

import { Separator } from "../ui/separator";
import { Button } from "@base-ui/react";

const SelectedSeat = () => {
  return (
    <div className="w-80.25 h-25.75 rounded-2xl p-3.75 flex flex-col gap-1.5 bg-surface">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <p className="font-sans text-xs font-normal leading-[130%] tracking-normal text-muted">
              Seat
            </p>
            <p className="font-sans text-xs font-semibold leading-none tracking-normal text-white">
              B3
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-sans text-xs font-semibold leading-none tracking-normal text-white">
              ₾16
            </span>
            <X className="text-muted cursor-pointer" size={16} />
          </div>
        </div>
        <Separator className="bg-subtle" />
        <div className="flex items-center gap-2">
          <Button className="flex-1 h-8 flex items-center justify-center gap-0.5 rounded-2xl py-2 bg-surface-secondary text-white font-sans text-xs font-normal leading-[130%] tracking-normal">
            Child 60%
          </Button>
          <Button className="flex-1 h-8 flex items-center justify-center gap-0.5 rounded-2xl py-2 bg-surface-secondary text-white font-sans text-xs font-normal leading-[130%] tracking-normal">
            Student 75%
          </Button>
          <Button className="flex-1 h-8 flex items-center justify-center gap-0.5 rounded-2xl py-2 bg-danger text-white font-sans text-xs font-normal leading-[130%] tracking-normal">
            Adult 100%
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectedSeat;
