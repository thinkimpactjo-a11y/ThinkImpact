"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/models/db/authOptions";
import { deleteSettings } from "@/app/models/db/lib/services/settings";
export async function deleteSetting(settingId: string) {
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

  const result = await deleteSettings(settingId);
  return {
    message: result.message,
    success: result.success,
    status: result.statusCode,
  };
}
