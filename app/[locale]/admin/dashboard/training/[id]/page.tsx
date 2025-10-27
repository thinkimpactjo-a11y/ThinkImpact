import React from "react";
import { editTraining } from "../(fetch)/editTraining";
import EditTrainingForm from "@/components/training/editTrainingForm";
import { getTrainingById } from "@/app/models/db/lib/services/training";

async function Page(prop: { params: Promise<{ id: string }> }) {
  const params = await prop.params;
  const training = await getTrainingById(params.id);

  return (

      <main>
        <EditTrainingForm training={training[0]} action={editTraining} />
      </main>
  );
}

export default Page;
