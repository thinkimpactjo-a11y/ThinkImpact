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

export async function editBanner(data: BannerUpdate) {
  const { bannerId, ...body } = data;

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
    `${process.env.NEXT_PUBLIC_APP_URL}/api/banners/${bannerId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    return {
      message: "Error Updating Banner",
      success: false,
      status: res.status,
    };
  }

  revalidatePath("/admin/dashboard/banners");

  return {
    message: "Banner Updated Successfully",
    success: true,
    status: 200,
  };
}