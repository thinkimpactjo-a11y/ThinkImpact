"use server";

import { authOptions } from "@/app/models/db/authOptions";
import { editCourse as editCourseRecord } from "@/app/models/db/lib/services/courses";
import { type editCourse } from "@/types";
import { getServerSession } from "next-auth";

export async function editCourse(data: editCourse) {
  const { id, ...courseData } = data;
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      message: "UNAUTHENTICATED",
      success: false,
      status: 401,
    };
  }

  if (session.user.role !== "admin") {
    return {
      message: "UNAUTHORIZED",
      success: false,
      status: 403,
    };
  }

  if (!id) {
    return {
      message: "ID is required",
      success: false,
      status: 400,
    };
  }

  const result = await editCourseRecord(id, courseData);
  return {
    message: result.message,
    success: result.success,
    status: result.statusCode,
  };
}
