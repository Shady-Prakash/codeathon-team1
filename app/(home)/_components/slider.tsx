"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useRef, useState, memo, useEffect } from "react";
import { type CarouselApi } from "@/components/ui/carousel";

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
      <section className="py-16 px-8 bg-gray-100 text-center w-full">
        <h2 className="text-4xl font-semibold mb-6 text-gray-900 tracking-tight">
          About BIG Alliance
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
          We connect businesses with community organisations and educational
          institutions to create better opportunities, better spaces, and better
          lives for Islington residents.
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
            <CarouselItem key={index} className="relative px-2">
              <AspectRatio
                ratio={16 / 9}
                className="overflow-hidden rounded-lg shadow-lg transform scale-90"
              >
                <Image
                  src={`/assets/slider/${img}.jpg`}
                  alt={`Charity slider image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>

        
        <div className="absolute bottom-6 w-full flex justify-center items-center space-x-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-4 w-4 rounded-full ${
                isActive(index) ? "bg-[#37AB87]" : "bg-gray-400"
              } transition-all duration-300`}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
});

export default Slider;
