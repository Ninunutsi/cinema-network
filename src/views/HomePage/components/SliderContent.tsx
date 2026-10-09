import { useCallback, useState } from "react";

import SlideText from "./SlideText";
import SliderActions from "./SliderActions";
import type { FeaturedMovie } from "../../../features/movies/movies.types";

interface SliderContentProps {
  movies: FeaturedMovie[];
  current: number;
}

const SliderContent = ({ movies, current }: SliderContentProps) => {
  const [heights, setHeights] = useState<Record<number, number>>({});
  const activeMovie = movies[current] ?? movies[0];

  const handleHeight = useCallback((id: number, height: number) => {
    setHeights((prev) =>
      prev[id] === height ? prev : { ...prev, [id]: height },
    );
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-end pb-32">
      <div className="flex w-145 max-w-xl flex-col gap-5 pl-16">
        <div
          className="relative transition-[height] duration-700 ease-bounce motion-reduce:transition-none"
          style={{ height: heights[activeMovie.id] }}
        >
          {movies.map((movie, index) => (
            <SlideText
              key={movie.id}
              movie={movie}
              isActive={index === current}
              onHeight={handleHeight}
            />
          ))}
        </div>

        <SliderActions
          ticketsUrl={`/movies/${activeMovie.slug}`}
          sessionsUrl={`/movies/${activeMovie.slug}/sessions`}
        />
      </div>
    </div>
  );
};

export default SliderContent;
