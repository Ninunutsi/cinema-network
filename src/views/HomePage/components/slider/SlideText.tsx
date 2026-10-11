import { useCallback } from "react";
import Timer from "@/assets/timer.svg?react";
import { Badge } from "@/components/ui/badge";
import { formatRuntime } from "@/features/movies/utils";
import type { FeaturedMovie } from "@/features/movies/movies.types";

interface SlideTextProps {
  movie: FeaturedMovie;
  isActive: boolean;
  onHeight: (id: number, height: number) => void;
}

const SlideText = ({ movie, isActive, onHeight }: SlideTextProps) => {
  const measure = useCallback(
    (el: HTMLDivElement | null) => {
      if (!el) return;
      const report = () => onHeight(movie.id, el.offsetHeight);
      report();
      const observer = new ResizeObserver(report);
      observer.observe(el);
      return () => observer.disconnect();
    },
    [movie.id, onHeight],
  );

  const genre = movie.genres[0]?.name;

  return (
    <div
      ref={measure}
      inert={!isActive}
      className={`absolute inset-x-0 top-0 flex flex-col gap-5 transition-opacity duration-500 ease-out motion-reduce:transition-none ${
        isActive ? "opacity-100 delay-150" : "pointer-events-none opacity-0"
      }`}
    >
      {genre && <Badge variant="danger">{genre}</Badge>}

      <h2 className="font-sans text-[40px] font-extrabold leading-none tracking-normal text-white">
        {movie.title}
      </h2>

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="danger">{movie.ageRating.code}</Badge>

        <Badge variant="muted">
          <Timer aria-hidden="true" />
          {formatRuntime(movie.runtimeMinutes)}
        </Badge>

        {movie.formats?.map((format) => (
          <Badge key={format.id} variant="muted">
            {format.name}
          </Badge>
        ))}
      </div>

      <p className="font-sans text-sm font-normal leading-[130%] tracking-normal text-white">
        {movie.synopsis}
      </p>
    </div>
  );
};

export default SlideText;
