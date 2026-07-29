"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/models/db/authOptions";
import { deleteCoruse as deleteCourseRecord } from "@/app/models/db/lib/services/courses";

export async function deleteCourse(courseId: string) {
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

  const result = await deleteCourseRecord(courseId);
  return {
    message: result.message,
    success: result.success,
    status: result.statusCode,
  };
}
