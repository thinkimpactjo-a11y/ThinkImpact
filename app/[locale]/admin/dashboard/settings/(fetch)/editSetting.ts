"use server";
import { authOptions } from "@/app/models/db/authOptions";
import { newSetting } from "@/types";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { editSetting as editSettingRecord } from "@/app/models/db/lib/services/settings";
const EXPIRE_SECONDS = 15 * 24 * 60 * 60; // 15 days in seconds

export async function editSetting(data: Partial<newSetting>) {
  const { id, ...settingData } = data;
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

  const result = await editSettingRecord(id, settingData);
  return {
    message: result.message,
    success: result.success,
    status: result.statusCode,
  };
}
