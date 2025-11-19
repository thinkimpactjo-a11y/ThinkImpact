import { newCategory } from "@/types";
import Image from "next/image";
import React from "react";

interface Props {
  isArabic: boolean;
  data: newCategory;
}

export default function HeaderSection({ isArabic, data }: Props) {
  return (
    <section className="w-full h-[60vh] relative">
      <Image
        src={data.category_logo??""}
        alt={isArabic ? data.category_name_ar : data.category_name_en}
        fill
        className="object-cover"
        priority
      />

      <div className="bg-black/50 w-full h-full absolute top-0 flex justify-center items-center">
        <h2 className="text-white text-center text-4xl font-bold">
          {isArabic ? data.category_name_ar : data.category_name_en}
        </h2>
      </div>
    </section>
  );
}
