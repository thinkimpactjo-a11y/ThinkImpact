"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { newSetting } from "@/types";
import { useLocale } from "next-intl";
type DataProp = {
  data: newSetting[];
};

export default function VideoHeroSection(data: DataProp) {
  const locale = useLocale();
  const isArabic = locale === "ar";

  const videoUrl = data.data.find((ele, i) => {
    return ele.key_name_en === "home_video";
  });

  const videoText = data.data.find((ele, i) => {
    return ele.key_name_en === "text_home_video";
  });

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const q = gsap.utils.selector(sectionRef);
    const tl = gsap.timeline();

    tl.fromTo(
      q(".hero-text"),
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    ).fromTo(
      q(".hero-button"),
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: "linear" },
      "-=0.5"
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/50 z-10" />

      <video
        src={videoUrl?.value_en}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6">
        <h1 className="hero-text text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 opacity-0 drop-shadow-lg leading-tight max-w-4xl">
          {isArabic ? videoText?.value_ar : videoText?.value_en}
        </h1>

        <Link href="/about">
          <Button className="hero-button px-6 py-3 sm:px-8 sm:py-4 cursor-pointer text-base sm:text-lg rounded-full bg-blue-700 hover:bg-blue-800 text-white opacity-0 shadow-lg transition">
            {isArabic ? "ابدأ الآن" : "Get Started Now"}
          </Button>
        </Link>
      </div>
    </section>
  );
}
