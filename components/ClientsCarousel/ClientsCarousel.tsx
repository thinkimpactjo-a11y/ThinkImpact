"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from 'next/image';
type Client = {
  id?: string;
  name: string;
  logo: string;
  created_at?: Date;

};

type Props = {
  clients: Client[];
    locale:string
};

export default function ClientsCarousel({ clients,locale }: Props) {
  const isArabic= locale==="ar"
  return (
    <section className="flex flex-col   justify-center items-center mt-20 w-full">
      <h1 className="text-center text-3xl md:text-5xl sm:text-4xl font-bold text-[#125892] mb-8">
         {isArabic ? "شركائنا  ":"Our Collaborations"} 
      </h1>

      <div className="w-full max-w-5xl cursor-pointer">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={30}
          slidesPerView={2}
          navigation
          pagination={{ clickable: true  } }
          autoplay={{ delay: 2000 }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 20 },
            640: { slidesPerView: 1, spaceBetween: 30 },
            768: { slidesPerView: 1, spaceBetween: 40 },
            1024: { slidesPerView: 3, spaceBetween: 50 },
          }}
          className="w-full h-80 my-8"
        >
          {clients.map((client, i) => (
            <SwiperSlide key={i} className="flex  justify-center items-center">
              <div className="flex flex-col items-center p-4 rounded-lg h-full">
                <div className="h-40 flex items-center justify-center">
              
<Image
  src={client.logo}
  alt={client.name}
  className="max-h-full max-w-[150px] object-contain"
  width={150}
  height={100}
/>
                </div>
                <p className="mt-3 font-medium text-center">{client.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper >
      </div>
    </section>
  );
}
