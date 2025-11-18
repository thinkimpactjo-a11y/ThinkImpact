import React from "react";
import Image from "next/image";

interface CardProps {
  title: string;
  description: string;
  service_image: string;
}

const FlippingCard: React.FC<CardProps> = ({ title, description, service_image }) => {
  return (
    <div
      className="relative w-full max-w-sm aspect-[3/2] rounded-lg overflow-hidden
                 perspective-[1000px] transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
                 hover:scale-[1.03] hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)] group cursor-pointer"
    >
      {/* FRONT: background image (preloaded with next/image) */}
      <div className="absolute inset-0 w-full h-full">
        {/* next/image with fill + priority to preload */}
        <Image
          src={service_image}
          alt={title}
          fill
          priority
          sizes="(max-width: 640px) 80vw, 300px"
          className="object-cover"
        />
      </div>

      {/* subtle dark overlay (dims image only) */}
      <div className="absolute inset-0 bg-black/25 z-10 transition-colors duration-300 group-hover:bg-black/40" />

      {/* Title on top of overlay */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <h3
          className="inline-block text-center text-xl font-semibold text-white
                     drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]
                      rounded-md px-3 py-1"
        >
          {title}
        </h3>
      </div>

      {/* BACK side (flip content) */}
      <div
        className="absolute top-0 left-0 w-full h-full p-5 box-border text-white
                   transform -rotate-x-90 origin-bottom
                   transition-transform duration-600 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
                   group-hover:rotate-x-0
                   flex flex-col justify-center bg-[#0f4473] z-30"
      >
        <p className="mt-2 text-sm lg:text-base leading-relaxed" dir="rtl">{description}</p>
      </div>
    </div>
  );
};

export default FlippingCard;
