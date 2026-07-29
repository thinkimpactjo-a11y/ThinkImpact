import React from "react";
import Head from "next/head";
import { getCaregoryById } from "@/app/models/db/lib/services/consulting";
import { editCategory } from "../(fetch)/editCategory";
import EditCategoryForm from "@/components/consulting/editCategoryForm";
import NotFound from "@/app/not-found";

async function Page(prop: { params: Promise<{ id: string }> }) {
  const params = await prop.params;
  const category = (await getCaregoryById(params.id)).data;

  if (!category) return <NotFound />;

  return (
    <main>
      <EditCategoryForm category={category} action={editCategory} />
    </main>
  );
}

export default Page;
