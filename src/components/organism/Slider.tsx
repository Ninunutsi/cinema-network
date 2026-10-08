import { useMemo, useState } from "react";
import Fade from "embla-carousel-fade";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../ui/carousel";
import ArrorLeft from "../../assets/arrow-left.svg?react";
import SliderContent from "../molecules/SliderContent";
import { sliderData } from "../../types/slider.types";
import Autoplay from "embla-carousel-autoplay";
const Slider = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const plugins = useMemo(
    () => [
      Fade(),
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
    [],
  );

  const handleApiChange = (carouselApi: CarouselApi) => {
    setApi(carouselApi);
    if (!carouselApi) return;

    setCurrent(carouselApi.selectedScrollSnap());
    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap());
    });
  };

  return (
    <section className="relative w-full">
      <Carousel
        className="w-full"
        setApi={handleApiChange}
        plugins={plugins}
        opts={{
          loop: true,
          duration: 100,
        }}
      >
        <CarouselContent className="ml-0">
          {sliderData.map((slide, index) => (
            <CarouselItem key={slide.title} className="basis-full pl-0">
              <div className="relative h-197.5 w-full overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

                <SliderContent slide={slide} isActive={current === index} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute inset-x-0 bottom-8 z-10 flex items-center gap-5 px-8">
          <div className="flex flex-1 items-center gap-1.75">
            {sliderData.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-0.75 flex-1 transition-all duration-300 ${
                  current === index ? "bg-orange-500" : "bg-white"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <CarouselPrevious
              icon={<ArrorLeft className="size-8.5 rotate-180" />}
              className="static size-13.5 cursor-pointer translate-y-0 rounded-full border-0 bg-[rgba(7,12,28,0.2)] opacity-100 text-white hover:bg-[rgba(7,12,28,0.3)]"
            />
            <CarouselNext
              icon={<ArrorLeft className="size-8.5" />}
              className="static size-13.5 cursor-pointer translate-y-0 rounded-full border-0 bg-[rgba(7,12,28,0.2)] opacity-100 text-white hover:bg-[rgba(7,12,28,0.3)]"
            />
          </div>
        </div>
      </Carousel>
    </section>
  );
};

export default Slider;
