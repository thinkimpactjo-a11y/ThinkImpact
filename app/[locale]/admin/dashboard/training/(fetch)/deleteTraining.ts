"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/models/db/authOptions";
import { deleteTraining as deleteTrainingRecord } from "@/app/models/db/lib/services/training";
const EXPIRE_SECONDS = 15 * 24 * 60 * 60; // 15 days in seconds

export async function deleteTraining(trainingId: string) {
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

  const result = await deleteTrainingRecord(trainingId);
  return {
    message: result.message,
    success: result.success,
    status: result.statusCode,
  };
}
