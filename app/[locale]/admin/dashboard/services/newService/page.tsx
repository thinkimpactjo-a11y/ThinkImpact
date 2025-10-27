import React from "react";
import Head from "next/head";
import CreateNewService from "@/components/services/createNewService";
import { createService } from "../(fetch)/createService";
import { getAllcategories } from "@/app/models/db/lib/services/consulting";

async function Page() {
  const categories = await getAllcategories();

  return (
    <>
      <CreateNewService action={createService} categories={categories} />
    </>
  );
}

export default Page;
