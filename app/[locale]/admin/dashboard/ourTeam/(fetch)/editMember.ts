"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/models/db/authOptions";
import { newMember } from "@/types";

export async function editMember(data: newMember) {
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

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/ourTeam/${data.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    return {
      message: "ERROR_UPDATING_MEMBER",
      success: false,
      status: res.status,
    };
  }

  revalidatePath("/dashboard/ourTeam");

  return {
    message: "MEMBER_UPDATED_SUCCESSFULLY",
    success: true,
    status: 200,
  };
}