import React from "react";
import Head from "next/head";
import NewApplicationForm from "@/components/careers/newApplicationForm";
import { newApplication } from "./(fetch)/newApplication";
import type { Metadata } from "next"
import { PAGE_METADATA, createMetadata } from "@/lib/constants/metadata"
export const metadata: Metadata = createMetadata(PAGE_METADATA.joinOurTeam)
type Props = {
  params: Promise<{ locale: string }>;
};

async function page({ params }: Props) {
  const { locale } = await params;


  return (
    <>


      <div>
        <NewApplicationForm action={newApplication} locale={locale} />
      </div>
    </>
  );
}

export default page;
