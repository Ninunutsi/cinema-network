import { Badge } from "../ui/badge";
import Timer from "../../assets/timer.svg?react";
import Ticket from "../../assets/ticket.svg?react";
import { Button } from "../ui/button";
import type { SliderData } from "../../types/slider.types";

interface SliderContentProps {
  slide: SliderData;
}

const SliderContent = ({ slide }: SliderContentProps) => {
  return (
    <div className="relative z-10 flex h-full items-center">
      <div className="w-145 max-w-xl pl-16">
        <Badge className="mb-3.75 bg-danger-tint px-3 py-1.5 font-sans text-xs font-semibold leading-none tracking-normal text-danger">
          {slide.badge}
        </Badge>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <h1 className="font-sans text-[40px] font-extrabold leading-none tracking-normal text-white">
              {slide.title}
            </h1>

            <div className="flex items-center gap-2">
              <Badge className="mb-3.75 bg-danger-tint px-3 py-1.5 font-sans text-xs font-semibold leading-none tracking-normal text-danger">
                {slide.ageRating}
              </Badge>

              <Badge className="mb-3.75 flex gap-1 bg-background-tint px-3 py-1.5 font-sans text-xs font-semibold leading-none tracking-normal text-white">
                <Timer />
                {slide.duration}
              </Badge>

              <Badge className="mb-3.75 bg-background-tint px-3 py-1.5 font-sans text-xs font-semibold leading-none tracking-normal text-white">
                {slide.format}
              </Badge>

              <Badge className="mb-3.75 bg-background-tint px-3 py-1.5 font-sans text-xs font-semibold leading-none tracking-normal text-white">
                {slide.experience}
              </Badge>
            </div>

            <p className="font-sans text-sm font-normal leading-[130%] tracking-normal text-white">
              {slide.description}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button className="flex h-10.5 w-36 cursor-pointer items-center gap-1 rounded-full bg-danger px-5.5 py-3 font-sans text-sm font-extrabold leading-none tracking-normal text-white hover:bg-danger">
              <Ticket />
              Buy tickets
            </Button>

            <Button className="flex h-10.5 w-36 cursor-pointer items-center gap-1 rounded-full bg-white/10 px-5.5 py-3 font-sans text-sm font-extrabold leading-none tracking-normal text-white hover:bg-white/10">
              All sessions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderContent;
