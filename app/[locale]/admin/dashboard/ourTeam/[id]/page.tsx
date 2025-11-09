import React from "react";
import { getMemberById } from "@/app/models/db/lib/services/outTeam";
import { editMember } from "../(fetch)/editMember";
import EditMemberForm from "@/components/ourTeam/editMemberForm";

async function Page(prop: { params: Promise<{ id: string }> }) {
  const params = await prop.params;
  const members = await getMemberById(params.id);

  return (
    
      <main>
        <EditMemberForm member={members[0]} action={editMember} />
      </main>
  );
}

export default Page;
