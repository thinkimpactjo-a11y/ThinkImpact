import React from "react";
import Head from "next/head";
import { getServiceById } from "@/app/models/db/lib/services/services";
import { editService } from "../(fetch)/editService";
import EditServiceForm from "@/components/services/editServiceForm";
import { getAllcategories } from "@/app/models/db/lib/services/consulting";

async function Page(prop: { params: Promise<{ id: string }> }) {
  const params = await prop.params;
  const [service, categories] = await Promise.all([
    (await getServiceById(params.id)).data,
    (await getAllcategories()).data,
  ]);

  return (
    <div>
      <EditServiceForm
        service={service}
        action={editService}
        categories={categories||[]}
      />
    </div>
  );
}

export default Page;
