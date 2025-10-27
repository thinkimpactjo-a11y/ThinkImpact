import { getCaregoryByslug } from "@/app/models/db/lib/services/consulting";
import { getServiceByCategoryId } from "@/app/models/db/lib/services/services";
import { notFound } from "next/navigation";
import FlippingCard from "@/components/flippingcard/flippingcard";
import CardsWrapper from "@/components/wrappers/card-wrapper";
import { generateDynamicMetadata } from "@/lib/constants/metadata";

interface PageProps {
  params: Promise<{ locale: string; slug: string | string[] }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params; // انتظار الـ promise
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
    locale === "ar" ? categoryData.category_name_ar : categoryData.category_name_en;
  const categoryDesc =
    locale === "ar" ? categoryData.description_ar : categoryData.description_en;

  return (
    <div className={`p-6 ${locale === "ar" ? "text-right" : "text-left"}`}>
      <section
        aria-label="Spacer"
        className="w-[75%] flex flex-col items-center justify-center justify-self-center"
      >
        <h1 className="text-2xl font-bold mb-4 mt-20">{categoryName}</h1>
        <p className="mb-6">{categoryDesc}</p>
      </section>

      <CardsWrapper>
        {services.map((service) => {
          const serviceName = locale === "ar" ? service.name_ar : service.name_en;
          const serviceDesc = locale === "ar" ? service.description_ar : service.description_en;

          return (
            <FlippingCard
              key={service.id}
              title={serviceName}
              description={serviceDesc}
            />
          );
        })}
      </CardsWrapper>
    </div>
  );
}
