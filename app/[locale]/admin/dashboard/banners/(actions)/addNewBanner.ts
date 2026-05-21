"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/models/db/authOptions";

type BannerData = {
  alt: string;
  description_en: string;
  description_ar: string;
  image?: string | null;
};

export async function createBanner(data: BannerData) {
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

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/banners`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    return {
      message: "Error Creating Banner",
      success: false,
      status: res.status,
    };
  }

  revalidatePath("/admin/dashboard/banners");

  return {
    message: "Banner Created Successfully",
    success: true,
    status: 201,
  };
}