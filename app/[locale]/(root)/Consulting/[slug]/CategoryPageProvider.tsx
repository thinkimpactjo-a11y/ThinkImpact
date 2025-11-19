// app/consulting/[slug]/CategoryPageProvider.tsx
import {
  getAllcategories,
  getCaregoryByslug,
} from "@/app/models/db/lib/services/consulting";
import { getServiceByCategoryId } from "@/app/models/db/lib/services/services";
import { notFound } from "next/navigation";
import CategoryPage from "./CategoryPage"; // presentational component

// generateStaticParams returns plain objects
export async function generateStaticParams(): Promise<{ slug: string; locale: string }[]> {
  const categories = await getAllcategories();
  const locales = ["en", "ar"];
  const paths: { slug: string; locale: string }[] = [];

  categories.forEach((cat) => {
    if (!cat?.slug) return; // skip undefined slugs
    locales.forEach((locale) => paths.push({ slug: cat.slug??"", locale }));
  });

  return paths;
}

// params is a plain object (NOT a Promise)
export default async function CategoryPageProvider({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const { slug, locale } = params;

  if (!slug) notFound();

  const category = await getCaregoryByslug(slug);
  const categoryData = category?.[0];
  if (!categoryData) notFound();

  const services = await getServiceByCategoryId(categoryData.id ?? "");

  return (
    <CategoryPage
      locale={locale}
      categoryData={categoryData}
      services={services}
      slug={slug}
    />
  );
}
