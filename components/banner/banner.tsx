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
      <CarouselContent className="flex flex-row overflow-hidden">
        {banners.map((item, index) => {
          const title = item.alt;
          const description = isArabic
            ? item.description_ar ?? item.description_en
            : item.description_en;

          return (
            <CarouselItem
              key={item.id ?? index} // ✅ كل عنصر له key فريد
              className="relative min-w-full flex-shrink-0"
            >
              <Card className="border-0 shadow-none p-0">
                <CardContent className="aspect-[20/8] p-0 m-0 relative overflow-hidden">
                  {/* Background image */}
                  <Image
                    src={
                      item.image && item.image.trim() !== ""
                        ? item.image
                        : "/default-image.png"
                    }
                    alt={title}
                    fill
                    className="object-cover"
                  />

                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 z-10 ${
                      isArabic
                        ? "bg-gradient-to-l from-[#125892]/90 via-[#125892]/40 to-transparent"
                        : "bg-gradient-to-r from-[#125892]/90 via-[#125892]/40 to-transparent"
                    }`}
                  />

                  {/* Text content */}
                  <div
                    dir={isArabic ? "rtl" : "ltr"}
                    className={`absolute inset-y-0 z-20 flex flex-col justify-center text-white
                      ${
                        isArabic
                          ? "right-[6vw] items-start text-right"
                          : "left-[6vw] items-start text-left"
                      }`}
                  >
                    {/* ✅ padding داخلي لمنع اللزق */}
                    <div className="max-w-[520px] px-2 sm:px-0">
                      {title && (
                        <h2 className="font-bold mb-3 drop-shadow-md text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                          {title}
                        </h2>
                      )}

                      {description && (
                        <p className="leading-relaxed drop-shadow-md text-sm sm:text-base md:text-lg lg:text-xl">
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
