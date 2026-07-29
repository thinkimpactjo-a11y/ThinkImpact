import React from "react";
import Head from "next/head";
import { editCourse } from "../(fetch)/editCourse";
import EditCourseForm from "@/components/courses/editCourseForm";
import { getAllTraining } from "@/app/models/db/lib/services/training";
import { getCourseByCourseId } from "@/app/models/db/lib/services/courses";
import NotFound from "@/app/not-found";

async function Page(prop: { params: Promise<{ id: string }> }) {
  const params = await prop.params;
  const [course, training] = await Promise.all([
    (await getCourseByCourseId(params.id)).data,
    (await getAllTraining()).data,
  ]);

  if(!course) return <NotFound/>

  return (
    <main>
      <EditCourseForm
        course={course}
        action={editCourse}
        training={training || []}
      />
    </main>
  );
}

export default Page;
