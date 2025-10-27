import React from "react";
import Head from "next/head";
import CreateNewCategory from "@/components/consulting/createNewCategory";
import { createCategory } from "../(fetch)/createNewCategory";

async function page() {
  return (
    <>
      <CreateNewCategory action={createCategory} />
    </>
  );
}

export default page;
