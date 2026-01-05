"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { newSetting } from "@/types";
import { useLocale } from "next-intl";
import Image from "next/image";
import loader from "@/public/style/loader.gif";

type DataProp = {
  data: newSetting[];
};

export default function VideoHeroSection({ data }: DataProp) {
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [videoReady, setVideoReady] = useState(false);

  const videoUrl = data.find(
    (ele) => ele.key_name_en === "home_video"
  )?.value_en;

  const videoText = data.find(
    (ele) => ele.key_name_en === "text_home_video"
  );

  const sectionRef = useRef<HTMLElement>(null);

  /* Timeout أمان */
  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoReady(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  /* GSAP */
  useEffect(() => {
    if (!videoReady) return;

    const q = gsap.utils.selector(sectionRef);
    gsap
      .timeline()
      .fromTo(
        q(".hero-text"),
        { opacity: 0, y: -40 },
        { opacity: 1, y: 0, duration: 1 }
      )
      .fromTo(
        q(".hero-button"),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.4"
      );
  }, [videoReady]);

  return (
    <>
      {/* LOADING OVERLAY (لون الموقع الحقيقي) */}
      {!videoReady && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
          <Image src={loader} alt="loading" width={200} height={200} />
        </div>
      )}

      {/* HERO */}
      <section
        ref={sectionRef}
        className={`relative w-full h-screen overflow-hidden transition-opacity duration-500 ${
          videoReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-black/50 z-10" />

        {videoUrl && (
          <video
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onLoadedData={() => setVideoReady(true)}
            onError={() => setVideoReady(true)}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <h1 className="hero-text text-white text-4xl md:text-6xl font-bold mb-6 opacity-0">
            {isArabic ? videoText?.value_ar : videoText?.value_en}
          </h1>

          <Link href="/about">
            <Button className="hero-button opacity-0 px-8 py-4 rounded-full bg-blue-700 text-white">
              {isArabic ? "ابدأ الآن" : "Get Started Now"}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
