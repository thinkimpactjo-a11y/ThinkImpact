"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/models/db/authOptions";
import { addNewCategory } from "@/app/models/db/lib/services/consulting";
import { newCategory } from "@/types";


export async function createCategory(data: newCategory) {
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

  const result = await addNewCategory(data);


  return {
    message: result.message,
    success: result.success,
    status: result.statusCode,
  };
}
