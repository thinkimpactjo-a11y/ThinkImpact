import React from "react";
import Head from "next/head";
import { editCourse } from "../(fetch)/editCourse";
import EditCourseForm from "@/components/courses/editCourseForm";
import { getAllTraining } from "@/app/models/db/lib/services/training";
import { getCourseByCourseId } from "@/app/models/db/lib/services/courses";

async function Page(prop: { params: Promise<{ id: string }> }) {
  const params = await prop.params;

  const course = await getCourseByCourseId(params.id);
  const training = await getAllTraining();

  return (

      <main>
        <EditCourseForm course={course[0]} action={editCourse} training={training} />
      </main>
  );
}

export default Page;
