import React from "react";
import Head from "next/head";
import { getSettingbyId } from "@/app/models/db/lib/services/settings";
import { editSetting } from "../(fetch)/editSetting";
import EditSettingForm from "@/components/settings/editSettingForm";

async function Page(prop: { params: Promise<{ id: string }> }) {
  const params = await prop.params;
  const setting = await getSettingbyId(params.id);

  return (
    

      <main>
        <EditSettingForm setting={setting[0]} action={editSetting} />
      </main>
  );
}

export default Page;
