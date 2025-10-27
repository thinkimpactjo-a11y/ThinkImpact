"use client";

import React, { useEffect, useState, useRef } from "react";
import { useLocale } from "next-intl";
import { newSetting } from "@/types";
import gsap from "gsap";

type Stat = {
  labelEn: string;
  labelAr: string;
  count: number;
  suffix?: string;
};

type StatCardProps = {
  label: string;
  count: number;
  suffix?: string;
};

type DataProp = {
  data: newSetting[];
};

const StatCard = ({ label, count, suffix = "" }: StatCardProps) => {
  const [current, setCurrent] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false); // لتشغيل الانيميشن مرة واحدة فقط

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            // GSAP animation عند الوصول
            if (cardRef.current) {
              gsap.fromTo(
                cardRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
              );
            }

            // Counter animation عند الوصول
            const duration = 1200;
            const stepTime = Math.max(Math.floor(duration / count), 20);

            const timer = setInterval(() => {
              setCurrent((prev) => {
                const next = prev + 1;
                if (next >= count) {
                  clearInterval(timer);
                  return count;
                }
                return next;
              });
            }, stepTime);
          }
        });
      },
      { threshold: 0.3 } // يبدأ لما يظهر 30% من العنصر
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, [count]);

  return (
    <div
      ref={cardRef}
      className="stat-card relative flex flex-col items-center justify-center p-8 text-center border border-gray-200 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white overflow-hidden group"
    >
      <div className="absolute inset-0 bg-white dark:bg-[#0e4a78] group-hover:opacity-100 transition duration-500 z-0" />
      <dd className="text-6xl font-extrabold text-[#125892] dark:text-white drop-shadow-sm tracking-tight select-none z-10">
        {current.toLocaleString()}
        <span className="ml-1 text-3xl font-bold text-[#0e4a78] dark:text-white">
          {suffix}
        </span>
      </dd>
      <dt className="mt-4 text-lg font-semibold text-[#0e4a78] tracking-wide z-10 dark:text-white">
        {label}
      </dt>
    </div>
  );
};

export const Counter = ({ data }: DataProp) => {
  const locale = useLocale();
  const isArabic = locale === "ar";

  const numberOfClients = data.find(
    (ele) => ele.key_name_en === "number_of_clients"
  );
  const numberOfProjects = data.find(
    (ele) => ele.key_name_en === "number_of_projects"
  );

  const stats: Stat[] = [
    { labelEn: "Clients", labelAr: "عملاء", count: Number(numberOfClients?.value_en), suffix: "+" },
    { labelEn: "Projects", labelAr: "مشاريع", count: Number(numberOfProjects?.value_en), suffix: "+" },
    { labelEn: "Years of Experience", labelAr: "سنوات الخبرة", count: 10, suffix: "+" },
  ];

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="w-full max-w-7xl mx-auto py-20 px-6"
    >
      <h2 className="text-4xl font-bold text-center text-[#125892] mb-12">
        {isArabic ? "أرقامنا" : "Our Numbers"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            label={isArabic ? stat.labelAr : stat.labelEn}
            count={stat.count}
            suffix={stat.suffix}
          />
        ))}
      </div>
    </section>
  );
};
