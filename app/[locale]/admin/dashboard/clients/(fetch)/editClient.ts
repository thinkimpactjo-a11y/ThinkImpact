"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/models/db/authOptions";
import { editClients } from "@/app/models/db/lib/services/clients";
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

  const result = await editClients(String(data.id), data);

  revalidatePath("/dashboard/clients");

  return {
    message: result.message,
    success: result.success,
    status: result.statusCode,
    
  };
}
