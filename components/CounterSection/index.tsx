import React from "react";
import { Counter } from "@/components/counter";
import { newSetting } from "@/types";

type DataProp = {
  data: newSetting[];
};
export default async function CounterSection({ data }: DataProp) {
  return (
    <section className="bg-white dark:bg-[#020618]">
      <Counter data={data} />
    </section>
  );
}
