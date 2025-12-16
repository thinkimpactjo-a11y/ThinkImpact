"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/models/db/authOptions";
import { revalidatePath } from "next/cache";

const EXPIRE_SECONDS = 2 * 60; // 2 minutes

type BannerData={ alt: string;
    description_en: string;
    description_ar: string;
    image?: string | null;}

export async function createBanner(data: BannerData) {
  const session = await getServerSession(authOptions);

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

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/banners`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.user.token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("FAILED_TO_ADD_BANNER");
  }

  revalidatePath("/admin/dashboard/banners");
  return await res.json();
}
