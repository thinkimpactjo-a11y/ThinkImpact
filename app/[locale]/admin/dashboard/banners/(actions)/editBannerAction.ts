"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/models/db/authOptions";

interface BannerUpdate {
  bannerId?: string;
  alt: string;
  description_en: string;
  description_ar: string;
  image?: string | null;
}

const EXPIRE_SECONDS = 15 * 24 * 60 * 60; // ✅ 15 days

export async function editBanner(data: BannerUpdate) {
  const { bannerId, ...body } = data;

  const session = await getServerSession(authOptions);

  // ❌ not logged in
  if (!session) {
    throw new Error("UNAUTHENTICATED");
  }

  const nowSec = Math.floor(Date.now() / 1000);
const loginAtSec = session.user.loginAt
  ? Math.floor(new Date(session.user.loginAt).getTime() / 1000)
  : null;

  if (!loginAtSec || nowSec - loginAtSec > EXPIRE_SECONDS) {
  throw new Error("SESSION_EXPIRED");
}

  const token = session.user.token;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/banners/${bannerId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    throw new Error("FAILED_TO_UPDATE_BANNER");
  }

  revalidatePath("/dashboard/banners");

  return await res.json();
}
