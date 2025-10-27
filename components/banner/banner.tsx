"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import { newBanner } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {
  banners: newBanner[];
  locale: string;
};

export function Banner({ banners, locale }: Props) {
  const isArabic = locale.startsWith("ar");

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full mt-20"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {banners.map((item) => {
          const title = isArabic ? item.alt ?? item.alt : item.alt;
          const description = isArabic
            ? item.description_ar ?? item.description_en
            : item.description_en;

          return (
            <CarouselItem key={item.id} className="relative">
              <Card className="border-0 shadow-none p-0">
                <CardContent className="aspect-[20/8] p-0 m-0 relative overflow-hidden">
                  {/* Background image */}
                  <Image
                    src={item.image ?? "/default-image.png"}
                    alt={title}
                    fill
                    className="object-cover"
                  />

                  {/* Gradient overlay that follows text side */}
                  <div
                    className={`absolute inset-0 z-10 ${
                      isArabic
                        ? "bg-gradient-to-l from-[#125892]/90 via-[#125892]/40 to-transparent"
                        : "bg-gradient-to-r from-[#125892]/90 via-[#125892]/40 to-transparent"
                    }`}
                  />

                  {/* Text content (anchored to the correct side) */}
                  <div
                    dir={isArabic ? "rtl" : "ltr"}
                    className={`absolute top-0 bottom-0 z-20 flex flex-col justify-center text-white transition-all duration-300 
                      ${isArabic ? "right-[6vw] items-start text-right" : "left-[6vw] items-start text-left"}`}
                  >
                    <div className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[45%]">
                      {title && (
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 drop-shadow-md">
                          {title}
                        </h2>
                      )}
                      {description && (
                        <p className="text-base sm:text-lg md:text-xl leading-relaxed drop-shadow-md">
                          {description}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
