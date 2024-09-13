"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { type CarouselApi } from "@/components/ui/carousel"
import { useEffect, useRef, useState } from "react"


const Slider = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
 

  return (
    <>
    <Carousel
      setApi={setApi}
      className="w-full relative"
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      >
      <CarouselContent className="-ml-2 md:-ml-4">
        <CarouselItem className="pl-2 md:pl-4">
            <AspectRatio ratio={16 / 7.4}>
              <Image
                src="/assets/slider/sliderImg3.jpg"           
                alt="Charity slider image one"
                fill
                className="h-full w-full rounded-md object-cover"
              />
            </AspectRatio>
        </CarouselItem>
        <CarouselItem className="pl-2 md:pl-4">
          <AspectRatio ratio={16 / 7.4}>
            <Image
                src="/assets/slider/sliderImg1.jpg"
                fill
                alt="Charity slider image two"
              />
          </AspectRatio>
        </CarouselItem>
        <CarouselItem className="pl-2 md:pl-4">
          <AspectRatio ratio={16 / 7.4}>
            <Image
                src="/assets/slider/sliderImg2.jpg"
                fill
                alt="Charity slider image three"
              />
          </AspectRatio>
        </CarouselItem>
      </CarouselContent>
      {/* <CarouselPrevious className="btn btn-prev absolute left-8 top-50%"/>
      <CarouselNext className="btn btn-next absolute right-8 top-50%"/> */}
      <div className="text-green-500 absolute right-[50%] bottom-[5%]">Slide {current} / {count}</div>
    </Carousel>
    </>
  )
}
export default Slider
