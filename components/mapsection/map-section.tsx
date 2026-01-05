"use client";

import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Feature } from "geojson";
import { useLocale } from "next-intl";

const geoUrl = "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";

const arabicCountries = [
  "Algeria","Bahrain","Comoros","Djibouti","Egypt","Iraq","Jordan","Kuwait",
  "Lebanon","Libya","Mauritania","Morocco","Oman","Western Sahara","Gaza Strip",
  "Israel","Qatar","Saudi Arabia","Sudan","Syria","West Bank","Tunisia",
  "United Arab Emirates","Yemen",
];

const highlightedCountries = [
  "Egypt","Iraq","Jordan","Lebanon","Morocco","Israel","West Bank","Sudan","Syria",
];

const countryNameMap: Record<string, { ar: string; en: string }> = {
  Egypt: { ar: "مصر", en: "Egypt" },
  Iraq: { ar: "العراق", en: "Iraq" },
  Jordan: { ar: "الأردن", en: "Jordan" },
  Lebanon: { ar: "لبنان", en: "Lebanon" },
  Morocco: { ar: "المغرب", en: "Morocco" },
  Israel: { ar: "فلسطين", en: "Palestine" },
  "West Bank": { ar: "فلسطين", en: "Palestine" },
  Syria: { ar: "سوريا", en: "Syria" },
  Sudan: { ar: "السودان", en: "Sudan" },
};

type TooltipData = {
  name: string;
  x: number;
  y: number;
};

export default function MapSection() {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [scale, setScale] = useState(800);
  const locale = useLocale();
  const isArabic = locale === "ar";

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      const dpr = window.devicePixelRatio || 1;
      setIsMobile(width <= 600);
      const baseScale = width <= 600 ? 750 : width <= 1200 ? 550 : 800;
      const dprFactor = dpr > 1 ? 1.25 : 1;
      setScale(baseScale / dprFactor);
    };
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const translateCountryName = (name: string) => {
    return countryNameMap[name] ? (isArabic ? countryNameMap[name].ar : countryNameMap[name].en) : name;
  };

  const handleTooltip = (event: React.MouseEvent<SVGPathElement, MouseEvent>, name: string) => {
    const container = event.currentTarget.closest("section");
    if (!container) return;
    const rect = (container as HTMLElement).getBoundingClientRect();
    setTooltip({
      name: translateCountryName(name),
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className={`flex flex-col items-center w-full overflow-hidden relative ${isMobile ? "h-[40vh] p-4" : "h-screen p-8"} text-center`}
    >
      <h2 className={`font-bold text-[#125892] mt-7 ${isMobile ? "text-xl" : "text-4xl"}`}>
        {isArabic ? "أماكن عملنا في التنمية والتقييم" : "Countries of Operations"}
      </h2>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale, center: [22, 25] }}
        width={1000}
        height={600}
        className="w-full h-auto"
        onMouseLeave={() => !isMobile && setTooltip(null)}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }: { geographies: Feature[] }) =>
            geographies
              .filter((geo) => geo.properties?.name && arabicCountries.includes(geo.properties.name))
              .map((geo: Feature) => {
                const name = geo.properties?.name || "";
                const isHighlighted = highlightedCountries.includes(name);
                return (
                  <Geography
                    key={name}
                    geography={geo}
                    fill={isHighlighted ? "#125892" : "#d1d5db"}
                    stroke="#0b3d66"
                    style={{
                      default: { outline: "none" },
                      hover: isHighlighted
                        ? { fill: "#0b3d66", cursor: "pointer", outline: "none" }
                        : { fill: "#d1d5db", outline: "none" },
                      pressed: { outline: "none" },
                    }}
                    onMouseEnter={!isMobile && isHighlighted ? (event: React.MouseEvent<SVGPathElement, MouseEvent>) => handleTooltip(event, name) : undefined}
                    onClick={isMobile && isHighlighted ? (event: React.MouseEvent<SVGPathElement, MouseEvent>) => handleTooltip(event, name) : undefined}
                  />
                );
              })
          }
        </Geographies>
      </ComposableMap>

      {tooltip && (
        <div
          className="absolute bg-white dark:bg-[#020618] px-2 py-1 rounded shadow-md text-sm whitespace-nowrap z-10 pointer-events-none transition-all duration-150"
          style={{
            top: tooltip.y + 10,
            left: tooltip.x + 10,
          }}
        >
          {tooltip.name}
        </div>
      )}
    </section>
  );
}
