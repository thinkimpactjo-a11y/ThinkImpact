// app/.../page.tsx (edited)
import { getCaregoryByslug } from "@/app/models/db/lib/services/consulting";
import { getServiceByCategoryId } from "@/app/models/db/lib/services/services";
import { notFound } from "next/navigation";
import FlippingCard from "@/components/flippingcard/flippingcard";
import CardsWrapper from "@/components/wrappers/card-wrapper";
import { generateDynamicMetadata } from "@/lib/constants/metadata";
import Image from "next/image";

import HeaderSection from "@/components/page-header/page-header";

// <-- import your mobile/client card component (update path if needed) -->
import ConsultingphoneCard from "@/components/ConsultingCards/ConsultingPhoneCard";

interface PageProps {
  params: Promise<{ locale: string; slug: string | string[] }>;
}

const imageMap: Record<string, string> = {
  monitoring: "/images/monitoring1.png",
  evaluation: "/images/evaluation.png",
  "data-quality-assessment-dqa": "/images/dataAssessment.png",
  research: "/images/research.png",
};

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const id =
    Array.isArray(resolvedParams.slug) && resolvedParams.slug.length > 0
      ? resolvedParams.slug[0]
      : typeof resolvedParams.slug === "string"
      ? resolvedParams.slug
      : "";

  if (!id) return notFound();

  const category = await getCaregoryByslug(id);
  const categoryData = category[0];
  if (!categoryData) return notFound();

  const categoryName =
    resolvedParams.locale === "ar"
      ? categoryData.category_name_ar
      : categoryData.category_name_en;

  const categoryDesc =
    resolvedParams.locale === "ar"
      ? categoryData.description_ar
      : categoryData.description_en;

  return generateDynamicMetadata.page({
    type: "consulting",
    name: categoryName,
    description: categoryDesc,
    slug: id,
  });
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const id =
    Array.isArray(resolvedParams.slug) && resolvedParams.slug.length > 0
      ? resolvedParams.slug[0]
      : typeof resolvedParams.slug === "string"
      ? resolvedParams.slug
      : "";

  if (!id) notFound();

  const locale = resolvedParams.locale;

  const category = await getCaregoryByslug(id);
  const categoryData = category[0];
  if (!categoryData) notFound();

  const services = await getServiceByCategoryId(categoryData.id ?? "");

  const categoryName =
    locale === "ar"
      ? categoryData.category_name_ar
      : categoryData.category_name_en;
  const categoryDesc = locale === "ar" ? categoryData.description_ar : categoryData.description_en;

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"}>
      <HeaderSection isArabic={locale === "ar"} data={category[0]} />
      <div className={`p-6 ${locale === "ar" ? "text-right" : "text-left"}`}>
        <section
          aria-label="Spacer"
          className="w-[75%] flex flex-col items-center justify-center text-justify justify-self-center"
        >
          <p className="mb-6 mt-4 text-sm md:text-lg text-gray-700 dark:text-gray-200">{categoryDesc}</p>
        </section>

        {/* ---------- Desktop / Tablet (md+) ---------- */}
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

        {/* ---------- Mobile (small screens) ---------- */}
        <div className="block md:hidden">
          {/* ConsultingphoneCard is a client component (it uses "use client") */}
          <ConsultingphoneCard services={services} />
        </div>
      </div>

      {id === "evaluation" && (
        <div className="flex justify-center items-center text-2xl md:text-3xl lg:text-4xl font-semibold mt-10 text-[#125892]">
          Evaluation Framework
        </div>
      )}
      {id === "monitoring" && (
        <div className="flex justify-center items-center text-2xl md:text-3xl lg:text-4xl font-semibold mt-10 text-[#125892]">
          Monitoring Framework
        </div>
      )}
      {id === "data-quality-assessment-dqa" && (
        <div className="flex justify-center items-center text-2xl md:text-3xl lg:text-4xl font-semibold mt-10 text-[#125892]">
          Data Quality Assessment Process
        </div>
      )}
      {id === "research" && (
        <div className="flex justify-center items-center text-2xl md:text-3xl lg:text-4xl font-semibold mt-10 text-[#125892]">
          The Stages Of Research
        </div>
      )}

      {imageMap[id] && (
        <div className="w-full flex justify-center ">
          <div className="w-[75%] flex justify-center m-6 lg:m-24">
            <Image
              src={imageMap[id]}
              alt={id}
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
