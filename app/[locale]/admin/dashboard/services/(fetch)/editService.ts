"use server";
import { authOptions } from "@/app/models/db/authOptions";
import { editService as editServiceRecord } from "@/app/models/db/lib/services/services";
import { type editService } from "@/types";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function editService(data: editService) {
  const { id, ...serviceData } = data;
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

  const result = await editServiceRecord(id, serviceData);

  return {
    message: result.message,
    success: result.success,
    status: result.statusCode,
  };
}
