"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/models/db/authOptions";
import { editBanner } from "@/app/models/db/lib/services/banners";
import { newBanner } from "@/types";

export async function editBannerAction(data: Partial<newBanner>) {
  const { id, ...body } = data;

  console.log("data: Partial<newBanner>: ",data);
  
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

  if (!id) {
    return {
      message: "ID is required",
      success: false,
      status: 400,
    };
  }

  const res = await editBanner(id, body);
  return {
    message: res.message,
    success: res.success,
    status: res.statusCode,
  };
}
