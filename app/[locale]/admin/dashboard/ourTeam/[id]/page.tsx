import React from "react";
import { getMemberById } from "@/app/models/db/lib/services/outTeam";
import { editMemberAction } from "../(fetch)/editMember";
import EditMemberForm from "@/components/ourTeam/editMemberForm";
import NotFound from "@/app/not-found";

async function Page(prop: { params: Promise<{ id: string }> }) {
  const params = await prop.params;
  const members = (await getMemberById(params.id)).data;
  if (!members) return <NotFound />;

  return (
    <main>
      <EditMemberForm member={members} action={editMemberAction} />
    </main>
  );
}

export default Page;
