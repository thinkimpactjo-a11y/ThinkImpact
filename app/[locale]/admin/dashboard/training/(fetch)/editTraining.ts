"use server";
import { authOptions } from "@/app/models/db/authOptions";
import { newTraining } from "@/types";
import { getServerSession } from "next-auth";
import { editTraining as editTrainingRecord } from "@/app/models/db/lib/services/training";

export async function editTraining(data: newTraining) {
  const { id, ...trainingData } = data;
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
  const result = await editTrainingRecord(id, trainingData);

  return {
    message: result.message,
    success: result.success,
    status: result.statusCode,
  };
}
