"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/models/db/authOptions";
import { editUser } from "@/app/models/db/lib/services/users";

export async function updateUserRole(formData: FormData) {
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

  const userId = formData.get("userId") as string;
  const role = formData.get("newRole") as string;

  const result = await editUser(userId, role);

  return {
    message: result.message,
    success: result.success,
    status: result.statusCode,
  };
}
