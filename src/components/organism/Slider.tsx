import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../ui/carousel";
import ArrorLeft from "../../assets/arrow-left.svg?react";

const Slider = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const handleApiChange = (carouselApi: CarouselApi) => {
    setApi(carouselApi);

    if (!carouselApi) {
      return;
    }

    setCurrent(carouselApi.selectedScrollSnap());

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap());
    });
  };

  const handleIndicatorClick = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <section className="relative w-full">
      <Carousel
        className="w-full"
        setApi={handleApiChange}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="ml-0">
          {Array.from({ length: 4 }).map((_, index) => (
            <CarouselItem key={index} className="basis-full pl-0">
              <div className="relative h-197.5 w-full overflow-hidden">
                <div className="flex h-full w-full items-center justify-center bg-muted">
                  <span className="text-6xl font-semibold text-foreground/50">
                    {index + 1}
                  </span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute inset-x-0 bottom-8 z-10 flex items-center gap-5 px-8">
          <div className="flex flex-1 items-center gap-1.75">
            {Array.from({ length: 4 }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleIndicatorClick(index)}
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
              className="static size-13.5 cursor-pointer translate-y-0 rounded-full border-0 bg-[rgba(7,12,28,0.2)] opacity-100 text-white hover:bg-[rgba(7,12,28,0.3)] "
            />
            <CarouselNext
              className="static size-13.5 translate-y-0 cursor-pointer rounded-full border-0 bg-[rgba(7,12,28,0.2)] opacity-100 text-white hover:bg-[rgba(7,12,28,0.3)]"
              icon={<ArrorLeft className="size-8.5" />}
            />
          </div>
        </div>
      </Carousel>
    </section>
  );
};

export default Slider;
