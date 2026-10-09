import { useMemo, useState } from "react";
import Fade from "embla-carousel-fade";
import Autoplay from "embla-carousel-autoplay";

import ArrowLeft from "../../../assets/arrow-left.svg?react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../../../components/ui/carousel";
import { useCarouselIndex } from "../useCarouselIndex";
import { sliderData } from "../slider.types";
import SliderContent from "./SliderContent";

const Slider = () => {
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
        opts={{ loop: true, duration: 70 }}
      >
        <CarouselContent className="ml-0">
          {sliderData.map((slide, index) => (
            <CarouselItem key={slide.id} className="basis-full pl-0">
              <div className="relative h-197.5 w-full overflow-hidden">
                <img
                  src={slide.image}
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

        <SliderContent slides={sliderData} current={current} />

        <div className="absolute inset-x-0 bottom-8 z-10 flex items-center gap-5 px-8">
          <div className="flex flex-1 items-center gap-1.75">
            {sliderData.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}: ${slide.title}`}
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

export default Slider;
