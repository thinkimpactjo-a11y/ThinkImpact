import React from "react";
import Head from "next/head";
import CreateNewTraining from "@/components/training/createNewTraining";
import { createTraining } from "../(fetch)/createNewTraining";

async function Page() {
  return (
    <>
      <CreateNewTraining action={createTraining} />
    </>
  );
}

export default Page;
