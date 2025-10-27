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

  // You can add translations here if needed
  const title = locale === "ar" ? "تقديم طلب جديد - Think Impact" : "New Application - Think Impact";
  const description =
    locale === "ar"
      ? "قدّم طلبك الآن للانضمام إلى فريق Think Impact والتطور المهني."
      : "Submit your application now to join Think Impact and grow professionally.";

  return (
    <>


      <div>
        <NewApplicationForm action={newApplication} locale={locale} />
      </div>
    </>
  );
}

export default page;
