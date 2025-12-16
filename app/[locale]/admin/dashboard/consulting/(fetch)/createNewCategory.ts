"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/models/db/authOptions";
import { newCategory } from "@/types";

const EXPIRE_SECONDS = 15*24* 60 * 60; // 15 days

export async function createCategory(data: newCategory) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("UNAUTHENTICATED");
  }

  // Check login expiration
  const nowSec = Math.floor(Date.now() / 1000);
const loginAtSec = session.user.loginAt
  ? Math.floor(new Date(session.user.loginAt).getTime() / 1000)
  : null;

  if (!loginAtSec || nowSec - loginAtSec > EXPIRE_SECONDS) {
  throw new Error("SESSION_EXPIRED");
}

  const token = session.user.token;

  const result = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/consulting`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!result.ok) throw new Error("FAILED_TO_CREATE_CATEGORY");

  revalidatePath(`/dashboard/consulting`);
  return await result.json();
}
