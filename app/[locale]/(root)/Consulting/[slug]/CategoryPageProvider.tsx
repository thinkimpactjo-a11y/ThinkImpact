// app/.../CategoryPageProvider.tsx
import {
  getAllcategories,
  getCaregoryByslug,
} from "@/app/models/db/lib/services/consulting";
import { getServiceByCategoryId } from "@/app/models/db/lib/services/services";
import { notFound } from "next/navigation";
import CategoryPage from "./CategoryPage"; // your presentational component

interface PageProps {
  params: { locale: string; slug: string };
}

export async function generateStaticParams() {
  const categories = await getAllcategories();
  const locales = ["en", "ar"];
  const paths: PageProps["params"][] = [];

  categories.forEach((cat) => {
    locales.forEach((locale) => paths.push({ slug: cat.slug ?? "", locale }));
  });

  return paths;
}

export default async function CategoryPageProvider({
  params,
}: {
  params: PageProps["params"];
}) {
  const { slug, locale } = params;

  const category = await getCaregoryByslug(slug);
  const categoryData = category[0];
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
