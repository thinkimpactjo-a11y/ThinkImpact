import React from "react";
import { editTraining } from "../(fetch)/editTraining";
import EditTrainingForm from "@/components/training/editTrainingForm";
import { getTrainingById } from "@/app/models/db/lib/services/training";
import NotFound from "@/app/not-found";

async function Page(prop: { params: Promise<{ id: string }> }) {
  const params = await prop.params;
  const training = (await getTrainingById(params.id)).data;
  if (!training) return <NotFound />;

  return (
    <main>
      <EditTrainingForm training={training} action={editTraining} />
    </main>
  );
}

export default Page;
