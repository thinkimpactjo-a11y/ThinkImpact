import Head from "next/head";
import React from "react";
import CreateNewMemberForm from "@/components/ourTeam/createNewMember";
import { createMember } from "../(fetch)/addNewMember";

async function Page() {
  return (
    <>
      <CreateNewMemberForm action={createMember} />
    </>
  );
}

export default Page;
