"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/models/db/authOptions";
import { deleteService as deleteServiceRecord } from "@/app/models/db/lib/services/services";


export async function deleteService(serviceId: string) {
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

  const result = await deleteServiceRecord(serviceId);

  return {
    message: result.message,
    success: result.success,
    status: result.statusCode,
    data: result.data,
  };
}
