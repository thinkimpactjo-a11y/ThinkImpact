"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/models/db/authOptions";

const EXPIRE_SECONDS = 15 * 24 * 60 * 60; // 15 days

export async function deleteApplication(applicationId: string) {
  const session = await getServerSession(authOptions);

  // ❌ Not logged in
  if (!session) {
    throw new Error("UNAUTHENTICATED");
  }

  // ⏱ Validate loginAt
  const loginAtSec = session.user.loginAt
    ? Number(session.user.loginAt)
    : null;

  const nowSec = Math.floor(Date.now() / 1000);

  if (!loginAtSec || nowSec - loginAtSec > EXPIRE_SECONDS) {
    throw new Error("SESSION_EXPIRED");
  }

  const token = session.user.token;

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/careers/${applicationId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!result.ok) {
    throw new Error("FAILED_TO_DELETE_APPLICATION");
  }

  revalidatePath("/dashboard/careers");

  return await result.json();
}
