import React from "react";
import Head from "next/head";
import { getCaregoryById } from "@/app/models/db/lib/services/consulting";
import { editCategory } from "../(fetch)/editCategory";
import EditCategoryForm from "@/components/consulting/editCategoryForm";

async function Page(prop: { params: Promise<{ id: string }> }) {
  const params = await prop.params;
  const category = await getCaregoryById(params.id);

  const categoryData = category[0];

  return (
    

      <main>
        <EditCategoryForm category={categoryData} action={editCategory} />
      </main>
  );
}

export default Page;
