"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useRef, useState, memo } from "react";

const Slider = memo(() => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const onSelect = () => setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const isActive = (index: number) => index === current - 1;

  return (
    <div className="relative w-full">
      <section className="py-12 px-6 bg-gradient-to-r from-gray-100 to-gray-200 text-center w-full">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          About Our Company
        </h2>
        <p className="text-xl text-gray-600 leading-relaxed">
          We are committed to making a positive impact in the world through our
          innovative solutions and dedicated service. Our mission is to create
          lasting change and empower communities.
        </p>
      </section>
      <Carousel
        setApi={setApi}
        className="relative w-full"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="relative">
          {["sliderImg3", "sliderImg1", "sliderImg2"].map((img, index) => (
            <CarouselItem key={index} className="relative p-4">
              <AspectRatio
                ratio={16 / 9} // Maintain full width aspect ratio
                className="overflow-hidden rounded-xl shadow-lg transform scale-90" // Apply scale transform
              >
                <Image
                  src={`/assets/slider/${img}.jpg`}
                  alt={`Charity slider image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out"
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          aria-label="Previous slide"
          className="absolute left-4 top-[50%] transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-70 hover:bg-opacity-90 p-3 rounded-full cursor-pointer shadow-xl transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </CarouselPrevious>
        <CarouselNext
          aria-label="Next slide"
          className="absolute right-4 top-[50%] transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-70 hover:bg-opacity-90 p-3 rounded-full cursor-pointer shadow-xl transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </CarouselNext>

        <div className="absolute bottom-4 w-full flex justify-center items-center">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-4 w-4 mx-2 rounded-full ${
                isActive(index) ? "bg-[#059669] scale-110" : "bg-gray-300"
              } transition-transform duration-300`}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
});

export default Slider;
