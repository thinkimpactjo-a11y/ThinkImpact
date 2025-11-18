"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CardsWrapper from "@/components/wrappers/card-wrapper";
import {  newService } from "@/types";
import { useLocale } from "next-intl";
import Image from "next/image";
interface ServiceCardProps {
  services: newService[];
}

function ConsultingphoneCard({ services }: ServiceCardProps) {
  const locale = useLocale();
  return (
    <div>
      <CardsWrapper>
        {services.map((service) => {
          const title = locale === "ar" ? service.name_ar : service.name_en;
          const description =
            locale === "ar" ? service.description_ar : service.description_en;
          const image = service.image || "/default-service.jpg";

          return (
            <Card
              key={service.id}
              className={`shadow-xl p-0 bg-white border border-gray-200 dark:border-black dark:bg-[#125892] rounded-xl hover:shadow-2xl transition-shadow  flex flex-col relative overflow-hidden group ${
                locale === "ar" ? "text-right" : "text-left"
              }`}
              dir={locale === "ar" ? "rtl" : "ltr"}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#125892]/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 z-0" />
              <div className="w-full h-48 relative ">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover h-full w-full"
                />
              </div>

              <div className="flex flex-col justify-between flex-1 px-1">
                <CardHeader className="p-0">
                  <CardTitle className="text-lg font-bold text-[#125892] flex justify-center dark:text-white dark:font-semibold">
                    {title}
                  </CardTitle>
                  <CardContent className="text-gray-600 mb-10 text-justify p-0  px-5 text-sm dark:text-gray-100">
                    {description}
                  </CardContent>
                </CardHeader>
              </div>
            </Card>
          );
        })}
      </CardsWrapper>
    </div>
  );
}

export default ConsultingphoneCard;
