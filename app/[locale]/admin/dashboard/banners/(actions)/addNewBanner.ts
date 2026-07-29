"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/models/db/authOptions";
import { addNewBanner } from "@/app/models/db/lib/services/banners";
import { newBanner } from "@/types";

export async function createBanner(data: newBanner) {
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

  const res = await addNewBanner(data);


  return {
    message: res.message,
    success: res.success,
    status: res.statusCode,
  };
}
