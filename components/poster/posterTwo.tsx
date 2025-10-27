"use client";

import React from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import postImage from "@/public/images/molto2.svg"
import { newSetting } from "@/types";

type DataProp = {
  data: newSetting[];
};
export default function PosterSection(data: DataProp ) {
  const locale = useLocale();
  const isArabic = locale === "ar";
  
  const imageInPartTwo= data.data.find((ele,i)=>{
    return ele.key_name_en==="part_two_image"
  })

  const headerInPartTwo= data.data.find((ele,i)=>{
    return ele.key_name_en==="part_two_header"
  })

  const descriptionInPartTwo= data.data.find((ele,i)=>{
    return ele.key_name_en==="part_two_description"
  })

  const heading = isArabic ? headerInPartTwo?.value_ar : headerInPartTwo?.value_en;
  const description = isArabic
    ? descriptionInPartTwo?.value_ar
    : descriptionInPartTwo?.value_en;

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="w-full bg-[#125892] py-10 h-auto md:h-[400px] flex flex-col md:flex-row items-center justify-center px-6 md:px-16 gap-8"
    >
     
      <div className={`text-white md:w-1/2 ${isArabic ? "text-right" : "text-left"} text-center md:text-start`}>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {heading}
        </h1>
        <p className="text-lg md:text-xl opacity-90">{description}</p>
      </div>

 
      <div
        className={`md:w-1/2 flex justify-center ${
          isArabic ? "md:order-first" : ""
        }`}
      >
        <Image
          src={imageInPartTwo?.value_en??""}
          alt="Hero Poster"
          width={400}
          height={300}
          className="rounded-lg shadow-lg object-contain max-h-[300px]"
        />
      </div>
    </section>
  );
}
