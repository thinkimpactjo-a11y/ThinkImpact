"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/models/db/authOptions";

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

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/users/editUser/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.token}`,
      },
      body: JSON.stringify({ role }),
    }
  );

  if (!result.ok) {
    return {
      message: "Error Updating User Role",
      success: false,
      status: result.status,
    };
  }

  revalidatePath(`/dashboard/users/${userId}`);

  return {
    message: "User Role Updated Successfully",
    success: true,
    status: 200,
  };
}