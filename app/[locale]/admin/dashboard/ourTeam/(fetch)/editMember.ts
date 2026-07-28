"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/models/db/authOptions";
import { newMember } from "@/types";
import { editMember } from "@/app/models/db/lib/services/outTeam";

export async function editMemberAction(data: newMember) {
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

  if (!data.id) {
    return {
      message: "ID is required",
      success: false,
      status: 400,
    };
  }

  const res = await editMember(data.id, data);

  revalidatePath("/dashboard/ourTeam");

  return {
    message: res.message,
    success: res.success,
    status: res.statusCode,
  };
}
