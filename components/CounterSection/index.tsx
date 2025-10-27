
import React from "react";
import { Counter } from "@/components/counter";
import { getSettingsData } from "@/app/models/db/lib/services/settings";


export default async function CounterSection() {
  const data= await getSettingsData()
  
  return (
    <section className="bg-white dark:bg-[#020618]">
      <Counter data={data}  />
    </section>
  );
}
