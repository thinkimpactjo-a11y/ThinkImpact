"use server";

import { authOptions } from "@/app/models/db/authOptions";
import { changePassword } from "@/app/models/db/lib/services/reset-password";
import { getServerSession } from "next-auth";

export async function changePasswordAction(
  oldPassword: string,
  newPassword: string,
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Expired Session, Please Login",
      status: 401,
    };
  }

  const result = await changePassword(
    session.user.id,
    oldPassword,
    newPassword,
  );

  return {
    success: result.success,
    message: result.message,
    status: result.statusCode,
  };
}
