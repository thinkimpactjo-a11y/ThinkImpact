import Head from "next/head";
import React from "react";
import { getClientbyId } from "@/app/models/db/lib/services/clients";
import { editClient } from "../(fetch)/editClient";
import EditClientForm from "@/components/clients/editClientForm";

async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const client = await getClientbyId(params.id);
  const clientData = client[0];

  return (
    <>
      <Head>
        <title>Think Impact - Edit Client</title>
        <meta
          name="description"
          content={`Edit the client details for ${clientData?.name || "your client"} on Think Impact.`}
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_APP_URL}/admin/dashboard/clients/${clientData?.id}`}
        />

        {/* Open Graph / Social Sharing */}
        <meta property="og:title" content="Think Impact - Edit Client" />
        <meta
          property="og:description"
          content={`Edit the client details for ${clientData?.name || "your client"} on Think Impact.`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_APP_URL}/admin/dashboard/clients/${clientData?.id}`}
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_APP_URL}/images/logo.png`}
        />
        <meta property="og:site_name" content="Think Impact" />
      </Head>

      <EditClientForm client={clientData} action={editClient} />
    </>
  );
}

export default Page;
