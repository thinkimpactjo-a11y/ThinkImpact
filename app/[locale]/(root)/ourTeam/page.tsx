// app/our-team/page.tsx
import React from "react";
import Head from "next/head";
import { getAllMembers } from "@/app/models/db/lib/services/outTeam";
import OurTeamPage from "@/components/ourTeam/OurTeamPage";
import type { Metadata } from "next"
import { PAGE_METADATA, createMetadata } from "@/lib/constants/metadata"
export const metadata: Metadata = createMetadata(PAGE_METADATA.ourTeam)

export default async function Page() {
  const members = await getAllMembers();

  return (
    <>
      <OurTeamPage members={members || []} />
    </>
  );
}
