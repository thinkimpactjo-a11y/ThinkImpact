import React from "react";
import { createSettings } from "../(fetch)/createNewSetting";
import CreateNewSetting from "@/components/settings/createNewSettingFrom";
import { getSettingsData } from "@/app/models/db/lib/services/settings";

async function Page() {
  const settings = (await getSettingsData()).data;

  const existingKeys = (settings ?? [])
    .map((s) => s.key_name_en?.trim().toLowerCase())
    .filter((key): key is string => Boolean(key)); // remove undefined values

  return (
    <>
      <CreateNewSetting action={createSettings} existingKeys={existingKeys} />
    </>
  );
}

export default Page;
