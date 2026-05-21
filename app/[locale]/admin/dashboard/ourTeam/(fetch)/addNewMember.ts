"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/models/db/authOptions";
import { newMember } from "@/types";

export async function createMember(data: newMember) {
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

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/ourTeam`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.log("res: ", res);

    return {
      message: "Error Creating Member",
      success: false,
      status: res.status,
    };
  }

  revalidatePath("/dashboard/ourTeam");

  return {
    message: "Member Created Successfully",
    success: true,
    status: 201,
  };
}
