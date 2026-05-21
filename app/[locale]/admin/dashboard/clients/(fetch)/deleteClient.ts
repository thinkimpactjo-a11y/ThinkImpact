"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/models/db/authOptions";

export async function deleteClient(clientId: string) {
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
    `${process.env.NEXT_PUBLIC_APP_URL}/api/clients/${clientId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    return {
      message: "Error Deleting Client",
      success: false,
      status: res.status,
    };
  }

  revalidatePath("/dashboard/clients");

  return {
    message: "Client Deleted Successfully",
    success: true,
    status: 200,
  };
}