'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useRef, useState, memo, useEffect } from 'react';
import { type CarouselApi } from '@/components/ui/carousel';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  const isActive = (index: number) => index === current - 1;

  return (
    <div className='relative w-full'>
      <Carousel
        setApi={setApi}
        className='relative w-full'
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}>
        <CarouselContent className='relative'>
          {['sliderImg3', 'sliderImg1', 'sliderImg2'].map((img, index) => (
            <CarouselItem key={index} className='relative'>
              <AspectRatio ratio={16 / 9} className='overflow-hidden'>
                <Image
                  src={`/assets/slider/${img}.jpg`}
                  alt={`Charity slider image ${index + 1}`}
                  fill
                  className='object-cover'
                />
                <div className='absolute inset-0 bg-black opacity-50'></div>
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className='absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4 md:p-8'>
          <h2 className='text-2xl md:text-4xl font-semibold mb-4 md:mb-6'>
            Make an Impact: Your Donation Matters
          </h2>
          <p className='text-md md:text-lg leading-relaxed max-w-xl mb-2 md:mb-4'>
            Your support helps us drive meaningful change in our community.
          </p>
          <Link href='/register'>
            <Button variant='success' size='lg' border='rounded'>
              Become a Donor
            </Button>
          </Link>
        </div>

        {/* Hide the dots */}
        <div className='hidden'>
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-4 w-4 rounded-full ${
                isActive(index) ? 'bg-[#37AB87]' : 'bg-gray-400'
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
