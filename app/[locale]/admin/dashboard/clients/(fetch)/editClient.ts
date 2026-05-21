"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/models/db/authOptions";
import { newClient } from "@/types";

export async function editClient(data: newClient) {
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
    `${process.env.NEXT_PUBLIC_APP_URL}/api/clients/${data.id}`,
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
      message: "Error Updating Client",
      success: false,
      status: res.status,
    };
  }

  revalidatePath("/dashboard/clients");

  return {
    message: "Client Updated Successfully",
    success: true,
    status: 200,
  };
}