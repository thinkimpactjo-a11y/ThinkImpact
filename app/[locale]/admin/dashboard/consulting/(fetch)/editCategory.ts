"use server";
import { authOptions } from "@/app/models/db/authOptions";
import { editCategory as editConsultingCategory } from "@/app/models/db/lib/services/consulting";
import { newCategory } from "@/types";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";


export async function editCategory(data: newCategory) {
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

  const result = await editConsultingCategory(String(data.id), data);


  return {
    message: result.message,
    success: result.success,
    status: result.statusCode,
  };
}
