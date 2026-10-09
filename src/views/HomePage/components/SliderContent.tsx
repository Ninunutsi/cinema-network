import { useCallback, useState } from "react";
import type { SliderData } from "../slider.types";

import SliderActions from "./SliderActions";
import SlideText from "./SlideText";

interface SliderContentProps {
  slides: SliderData[];
  current: number;
}

const SliderContent = ({ slides, current }: SliderContentProps) => {
  const [heights, setHeights] = useState<Record<string, number>>({});
  const activeSlide = slides[current];

  const handleHeight = useCallback((id: string, height: number) => {
    setHeights((prev) =>
      prev[id] === height ? prev : { ...prev, [id]: height },
    );
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-end pb-32">
      <div className="flex w-145 max-w-xl flex-col gap-5 pl-16">
        <div
          className="relative transition-[height] duration-700 ease-bounce motion-reduce:transition-none"
          style={{ height: heights[activeSlide.id] }}
        >
          {slides.map((slide, index) => (
            <SlideText
              key={slide.id}
              slide={slide}
              isActive={index === current}
              onHeight={handleHeight}
            />
          ))}
        </div>

        <SliderActions
          ticketsUrl={activeSlide.ticketsUrl}
          sessionsUrl={activeSlide.sessionsUrl}
        />
      </div>
    </div>
  );
};

export default SliderContent;
