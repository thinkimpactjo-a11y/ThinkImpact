import Head from "next/head";
import React from "react";
import CreateNewClientForm from "@/components/clients/createNewClientForm";
import { createClient } from "../(fetch)/createNewClient";

async function Page() {
  return (
    <>
      <CreateNewClientForm action={createClient} />
    </>
  );
}

export default Page;
