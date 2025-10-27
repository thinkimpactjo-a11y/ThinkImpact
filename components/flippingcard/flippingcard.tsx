import React from 'react';
import Image from 'next/image';
import test from "@/public/images/logosidebar.png"

interface CardProps {
  title: string;
  description: string;
}

const FlippingCard: React.FC<CardProps> = ({ title, description }) => {
  return (
    <div className="relative w-full max-w-sm aspect-[3/2] bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden
                    perspective-[1000px] 
                    transition-transform duration-600 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
                    hover:scale-[1.05] hover:shadow-[0_8px_16px_rgba(255,255,255,0.2)] group cursor-pointer dark:bg-[#0f4473] ">

      <div className='flex flex-col items-center text-center'>
        <Image
          src={test}
          alt="Preload Image"
          width={50}
          height={50}
          priority
          loading="eager"
        />
        <p className='text-xl font-bold text-gray-800 m-0 dark:text-white'>{title}</p>
      </div>

      <div
        className="absolute top-0 left-0 w-full h-full p-5 box-border text-white
                   transform -rotate-x-90 origin-bottom
                   transition-transform duration-600 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
                   group-hover:rotate-x-0
                   flex flex-col justify-center  dark:bg-[#0f4473] bg-[#0f4473]  "
      >
        <p className="mt-2 text-sm  lg:text-base leading-relaxed dark:text-white dark:font-semibold text-white  ">{description}</p>
      </div>
    </div>
  );
};

export default FlippingCard;
