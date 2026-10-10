import { useMemo, useState } from "react";
import Fade from "embla-carousel-fade";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../../../../components/ui/carousel";
import ArrowLeft from "../../../../assets/arrow-left.svg?react";
import type { FeaturedMovie } from "../../../../features/movies/movies.types";
import { useCarouselIndex } from "../../useCarouselIndex";
import SliderContent from "./SliderContent";
import { useFeaturedQuery } from "../../../../features/movies/useNowPlayingQuery";

const SLIDER_HEIGHT = "h-197.5";

const SliderCarousel = ({ movies }: { movies: FeaturedMovie[] }) => {
  const [api, setApi] = useState<CarouselApi>();
  const current = useCarouselIndex(api);

  const plugins = useMemo(
    () => [
      Fade(),
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        stopOnFocusIn: true,
      }),
    ],
    [],
  );

  return (
    <section className="relative w-full">
      <Carousel
        className="w-full"
        setApi={setApi}
        plugins={plugins}
        opts={{ loop: movies.length > 1, duration: 70 }}
      >
        <CarouselContent className="ml-0">
          {movies.map((movie, index) => (
            <CarouselItem key={movie.id} className="basis-full pl-0">
              <div
                className={`relative ${SLIDER_HEIGHT} w-full overflow-hidden`}
              >
                <img
                  src={movie.backdropUrl ?? movie.posterUrl}
                  alt=""
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <SliderContent movies={movies} current={current} />

        <div className="absolute inset-x-0 bottom-8 z-10 flex items-center gap-5 px-8">
          <div className="flex flex-1 items-center gap-1.75">
            {movies.map((movie, index) => (
              <button
                key={movie.id}
                type="button"
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}: ${movie.title}`}
                aria-current={current === index ? "true" : undefined}
                className={`h-0.75 flex-1 transition-colors duration-300 ${
                  current === index ? "bg-orange-500" : "bg-white"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <CarouselPrevious
              icon={<ArrowLeft className="size-8.5 rotate-180" />}
              className="static size-13.5 cursor-pointer translate-y-0 rounded-full border-0 bg-[rgba(7,12,28,0.2)] opacity-100 text-white hover:bg-[rgba(7,12,28,0.3)]"
            />
            <CarouselNext
              icon={<ArrowLeft className="size-8.5" />}
              className="static size-13.5 cursor-pointer translate-y-0 rounded-full border-0 bg-[rgba(7,12,28,0.2)] opacity-100 text-white hover:bg-[rgba(7,12,28,0.3)]"
            />
          </div>
        </div>
      </Carousel>
    </section>
  );
};

const Slider = () => {
  const { data: movies, isPending } = useFeaturedQuery();

  if (isPending) {
    // Same height as the real slider, so the page doesn't jump when data arrives
    return (
      <section
        aria-busy="true"
        className={`${SLIDER_HEIGHT} w-full animate-pulse bg-background-tint`}
      />
    );
  }

  // Error or nothing featured: render nothing rather than a broken hero
  if (!movies?.length) return null;

  return <SliderCarousel movies={movies} />;
};

export default Slider;
