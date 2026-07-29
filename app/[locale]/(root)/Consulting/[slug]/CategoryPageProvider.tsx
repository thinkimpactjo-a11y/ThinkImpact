import {
  getAllcategories,
  getCaregoryByslug,
} from "@/app/models/db/lib/services/consulting";
import { getServiceByCategoryId } from "@/app/models/db/lib/services/services";
import { notFound } from "next/navigation";
import CategoryPage from "./CategoryPage";

export type RouteParams = { slug: string; locale: string };

export async function generateStaticParams(): Promise<RouteParams[]> {
  const categories = (await getAllcategories()).data;
  const locales = ["en", "ar"];
  const paths: RouteParams[] = [];

  (categories ?? []).forEach((cat) => {
    if (!cat?.slug) return;
    locales.forEach((locale) => paths.push({ slug: cat.slug ?? "", locale }));
  });

  return paths;
}

export default async function CategoryPageProvider({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug, locale } = await params;

  if (!slug) notFound();

  const category = (await getCaregoryByslug(slug)).data;
  const categoryData = category;
  if (!categoryData) notFound();

  const services = (await getServiceByCategoryId(categoryData.id ?? "")).data;

  return (
    <CategoryPage
      locale={locale}
      categoryData={categoryData}
      services={services ?? []}
      slug={slug}
    />
  );
}
