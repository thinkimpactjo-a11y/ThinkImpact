import { getCourseById } from "@/app/models/db/lib/services/courses";
import { getTrainingBySlug } from "@/app/models/db/lib/services/training";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CardsWrapper from "@/components/wrappers/card-wrapper";
import Image from "next/image";
import { generateDynamicMetadata } from "@/lib/constants/metadata";
import TrainingCard from "@/components/trainingShowing/trainingCard";
interface PageProps {
  params: Promise<{ locale: string; slug: string | string[] }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = Array.isArray(resolvedParams.slug)
    ? resolvedParams.slug[0]
    : resolvedParams.slug;
  if (!slug) return notFound();

  const training = await getTrainingBySlug(slug);
  const trainingData = training[0];
  if (!trainingData) return notFound();

  const trainingName =
    resolvedParams.locale === "ar"
      ? trainingData.name_ar
      : trainingData.name_en;
  const trainingDesc =
    resolvedParams.locale === "ar"
      ? trainingData.description_ar
      : trainingData.description_en;

  return generateDynamicMetadata.page({
    type: "training",
    name: trainingName,
    description: trainingDesc,
    slug: slug,
  });
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params; // انتظار الـ promise
  const id = Array.isArray(resolvedParams.slug)
    ? resolvedParams.slug[0]
    : resolvedParams.slug;
  const locale = resolvedParams.locale;

  const training = await getTrainingBySlug(id);
  const trainingData = training[0];
  if (!trainingData) notFound();

  const courses = await getCourseById(training[0].id ?? "");

  const trainingName =
    locale === "ar" ? trainingData.name_ar : trainingData.name_en;
  const trainingDesc =
    locale === "ar" ? trainingData.description_ar : trainingData.description_en;

  return (
    <div
      
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <section className="w-full   flex flex-col items-center text-justify mt-10">
        <h1 className="text-3xl font-bold mb-4 mt-20">{trainingName}</h1>
        <p className="mb-6 text-gray-700 w-[75%] text-justify text-lg dark:text-gray-100">
          {trainingDesc}
        </p>
      </section>

      <TrainingCard courses={courses}  />
     
    </div>
  );
}
