"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/models/db/authOptions";

const EXPIRE_SECONDS = 15 * 24 * 60 * 60; // 15 days in seconds

export async function updateUserRole(formData: FormData) {
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
  const token = session?.user.token;
  const userId = formData.get("userId") as string;
  const role = formData.get("newRole") as string;
  
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/users/editUser/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role }),
    }
  );
 
  

  if (!result.ok) throw new Error("Failed to update user role");

  revalidatePath(`/dashboard/users/${userId}`);
  return await result.json();
}
