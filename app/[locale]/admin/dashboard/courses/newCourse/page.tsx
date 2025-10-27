import React from "react";
import Head from "next/head";
import CreateCourseForm from "@/components/courses/createCourseForm";
import { createnewCourse } from "../(fetch)/createNewCourse";
import { getAllTraining } from "@/app/models/db/lib/services/training";

async function Page() {
  const training = await getAllTraining();

  return (
    <>
      <CreateCourseForm action={createnewCourse} training={training} />
    </>
  );
}

export default Page;
