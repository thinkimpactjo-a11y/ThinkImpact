"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/models/db/authOptions";
import { deleteCategory as deleteConsultingCategory } from "@/app/models/db/lib/services/consulting";


export async function deleteCategory(categoryId: string) {
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

  const result = await deleteConsultingCategory(categoryId);


  return {
    message: result.message,
    success: result.success,
    status: result.statusCode,
  };
}
