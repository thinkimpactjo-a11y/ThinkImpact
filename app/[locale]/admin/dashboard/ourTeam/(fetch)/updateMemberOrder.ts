"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/models/db/authOptions";
import { memeberOrder } from "@/types";

export async function updateMemberOrder(data: memeberOrder[]) {
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
    `${process.env.NEXT_PUBLIC_APP_URL}/api/ourTeam/updateOrder`,
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
      message: "Error Updating Member Order",
      success: false,
      status: res.status,
    };
  }

  revalidatePath("/dashboard/ourTeam");

  return {
    message: "Member Order Updated Successfully",
    success: true,
    status: 200,
  };
}