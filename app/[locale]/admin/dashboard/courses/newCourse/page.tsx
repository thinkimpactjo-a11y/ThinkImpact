import React from "react";
import CreateCourseForm from "@/components/courses/createCourseForm";
import { createnewCourse } from "../(fetch)/createNewCourse";
import { getAllTraining } from "@/app/models/db/lib/services/training";
import NotFound from "@/app/not-found";

async function Page() {
  const training = (await getAllTraining()).data;

  if (!training) return <NotFound />;

  return (
    <>
      <CreateCourseForm action={createnewCourse} training={training} />
    </>
  );
}

export default Page;
