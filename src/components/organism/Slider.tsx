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
import SliderContent from "../molecules/SliderContent";
import { sliderData } from "../../types/slider.types";

const slides = [
  {
    image: "/images/hero-1.jpg",
    title: "Drive Your Journey",
    description:
      "Explore Georgia with comfort, freedom, and a car that fits your journey.",
  },
  {
    image: "/images/hero-2.jpg",
    title: "Your Road. Your Rules.",
    description:
      "Choose from our wide range of reliable vehicles and hit the road.",
  },
  {
    image: "/images/hero-3.jpg",
    title: "Discover Georgia",
    description: "From Tbilisi to Batumi, make every trip unforgettable.",
  },
  {
    image: "/images/hero-4.jpg",
    title: "Ready for the Road?",
    description: "Book your car and start your journey today.",
  },
];

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
          {sliderData.map((slide) => (
            <CarouselItem key={slide.title} className="basis-full pl-0">
              <div className="relative h-197.5 w-full overflow-hidden">
                {/* Background image */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

                {/* Left content */}
                <SliderContent slide={slide} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute inset-x-0 bottom-8 z-10 flex items-center gap-5 px-8">
          <div className="flex flex-1 items-center gap-1.75">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
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
