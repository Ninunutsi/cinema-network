import { useCallback } from "react";
import Timer from "../../../assets/timer.svg?react";
import type { SliderData } from "../slider.types";
import { Badge } from "../../../components/ui/badge";

interface SlideTextProps {
  slide: SliderData;
  isActive: boolean;
  onHeight: (id: string, height: number) => void;
}

const SlideText = ({ slide, isActive, onHeight }: SlideTextProps) => {
  const measure = useCallback(
    (el: HTMLDivElement | null) => {
      if (!el) return;
      const report = () => onHeight(slide.id, el.offsetHeight);
      report();
      const observer = new ResizeObserver(report);
      observer.observe(el);
      return () => observer.disconnect();
    },
    [slide.id, onHeight],
  );

  return (
    <div
      ref={measure}
      inert={!isActive}
      className={`absolute inset-x-0 top-0 flex flex-col gap-5 transition-opacity duration-500 ease-out motion-reduce:transition-none ${
        isActive ? "opacity-100 delay-150" : "pointer-events-none opacity-0"
      }`}
    >
      <Badge variant="danger">{slide.badge}</Badge>

      <h2 className="font-sans text-[40px] font-extrabold leading-none tracking-normal text-white">
        {slide.title}
      </h2>

      <div className="flex items-center gap-2">
        <Badge variant="danger">{slide.ageRating}</Badge>
        <Badge variant="muted">
          <Timer aria-hidden="true" />
          {slide.duration}
        </Badge>
        <Badge variant="muted">{slide.format}</Badge>
        <Badge variant="muted">{slide.experience}</Badge>
      </div>

      <p className="font-sans text-sm font-normal leading-[130%] tracking-normal text-white">
        {slide.description}
      </p>
    </div>
  );
};

export default SlideText;
