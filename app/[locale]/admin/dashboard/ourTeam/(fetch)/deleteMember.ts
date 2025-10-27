"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/models/db/authOptions";

export async function deleteMember(memberId:string) {
  const session = await getServerSession(authOptions);
  const token = session?.user.token;
 
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/ourTeam/${memberId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!result.ok) throw new Error("Failed to delete Member");

  revalidatePath(`/dashboard/ourTeam`);
  return await result.json();
}
