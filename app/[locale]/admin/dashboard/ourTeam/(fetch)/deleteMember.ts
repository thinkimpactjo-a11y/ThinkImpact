"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/models/db/authOptions";
import { deleteMember } from "@/app/models/db/lib/services/outTeam";

export async function deleteMemberAction(memberId: string) {
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

  const res = await deleteMember(memberId);

  revalidatePath("/admin/dashboard/ourTeam");
  return {
    message: res.message,
    success: res.success,
    status: res.statusCode,
  };
}
