// app/.../CategoryPage.tsx
import React from "react";
import HeaderSection from "@/components/page-header/page-header";
import FlippingCard from "@/components/flippingcard/flippingcard";
import CardsWrapper from "@/components/wrappers/card-wrapper";
import ConsultingphoneCard from "@/components/ConsultingCards/ConsultingPhoneCard";
import Image from "next/image";
import Head from "next/head";

interface Props {
  locale: string;
  categoryData: any;
  services: any[];
  slug: string;
}

const imageMap: Record<string, string> = {
  monitoring: "/images/monitoring1.png",
  evaluation: "/images/evaluation.png",
  "data-quality-assessment-dqa": "/images/dataAssessment.png",
  research: "/images/research.png",
};

export default function CategoryPage({ locale, categoryData, services, slug }: Props) {
  const categoryDesc = locale === "ar" ? categoryData.description_ar : categoryData.description_en;

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"}>
      <Head>
        <link rel="preload" as="image" href={categoryData.category_logo ?? ""} />
      </Head>

      {/* Header */}
      <HeaderSection isArabic={locale === "ar"} data={categoryData} />

      {/* Page content */}
      <div className={`p-6 ${locale === "ar" ? "text-right" : "text-left"}`}>
        <section className="w-[75%] flex flex-col items-center justify-center text-justify justify-self-center">
          <p className="mb-6 mt-4 text-sm md:text-lg text-gray-700 dark:text-gray-200">{categoryDesc}</p>
        </section>

        <div className="hidden md:block">
          <CardsWrapper>
            {services.map((service) => {
              const serviceName = locale === "ar" ? service.name_ar : service.name_en;
              const serviceDesc = locale === "ar" ? service.description_ar : service.description_en;
              return (
                <FlippingCard
                  key={service.id}
                  title={serviceName}
                  description={serviceDesc}
                  service_image={service.image ?? ""}
                />
              );
            })}
          </CardsWrapper>
        </div>

        <div className="block md:hidden">
          <ConsultingphoneCard services={services} />
        </div>
      </div>

      {/* Category-specific title */}
      {slug === "evaluation" && (
        <div className="flex justify-center items-center text-2xl md:text-3xl lg:text-4xl font-semibold mt-10 text-[#125892]">
          {locale === "ar" ? "إطار التقييم" : "Evaluation Framework"}
        </div>
      )}
      {slug === "monitoring" && (
        <div className="flex justify-center items-center text-2xl md:text-3xl lg:text-4xl font-semibold mt-10 text-[#125892]">
          {locale === "ar" ? " إطار الرصد والمتابعة" : "Monitoring Framework"}
        </div>
      )}
      {slug === "data-quality-assessment-dqa" && (
        <div className="flex justify-center items-center text-2xl md:text-3xl lg:text-4xl font-semibold mt-10 text-[#125892]">
          {locale === "ar" ? "عملية تقييم جودة البيانات" : "Data Quality Assessment Process"}
        </div>
      )}
      {slug === "research" && (
        <div className="flex justify-center items-center text-2xl md:text-3xl lg:text-4xl font-semibold mt-10 text-[#125892]">
          {locale === "ar" ? "مراحل البحث" : "The Stages Of Research"}
        </div>
      )}

      {/* Category-specific image */}
      {imageMap[slug] && (
        <div className="w-full flex justify-center">
          <div className="w-[75%] flex justify-center m-6 lg:m-24">
            <Image
              src={imageMap[slug]}
              alt={slug}
              width={600}
              height={400}
              className="w-full h-auto object-contain flex justify-center rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
