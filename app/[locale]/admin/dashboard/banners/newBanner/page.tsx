import React from "react";
import CreateNewBanner from "@/components/banner/createNewBanner";
import { createBanner } from "../(actions)/addNewBanner";
async function Page() {
  return (
    <>
      <CreateNewBanner action={createBanner} />
    </>
  );
}

export default Page;
