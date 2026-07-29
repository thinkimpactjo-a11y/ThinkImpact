"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/models/db/authOptions";
import { type newCourse } from "@/types";
import { addNewCourse } from "@/app/models/db/lib/services/courses";

export async function createnewCourse(data: newCourse) {
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

  const result = await addNewCourse(data);

  return {
    message: result.message,
    success: result.success,
    status: result.statusCode,
  };
}
