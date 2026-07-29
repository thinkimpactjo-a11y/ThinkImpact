"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/models/db/authOptions";
import { newClient } from "@/types";
import { addNewClient } from "@/app/models/db/lib/services/clients";

export async function createClient(data: newClient) {
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

  const res = await addNewClient(data);

  return {
    message: res.message,
    success: res.success,
    status: res.statusCode,
  };
}
