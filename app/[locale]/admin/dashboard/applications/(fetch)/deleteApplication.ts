"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/models/db/authOptions";

export async function deleteApplication(applicationId: string) {
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

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/careers/${applicationId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.token}`,
      },
    }
  );

  if (!result.ok) {
    return {
      message: "Error Deleting Application",
      success: false,
      status: result.status,
    };
  }

  revalidatePath("/dashboard/careers");

  return {
    message: "Application Deleted Successfully",
    success: true,
    status: 200,
  };
}