"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/models/db/authOptions";
import { newTraining } from "@/types";
import { addNewTraining } from "@/app/models/db/lib/services/training";

export async function createTraining(data: newTraining) {
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

  const result = await addNewTraining(data);
  return {
    message: result.message,
    success: result.success,
    status: result.statusCode,
  };
}
