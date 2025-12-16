"use server"
import { authOptions } from "@/app/models/db/authOptions";
import { newCategory } from "@/types";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

const EXPIRE_SECONDS = 15*24* 60 * 60; // 15 days
export async function editCategory (data:newCategory){
    const session= await getServerSession(authOptions)
    const token= session?.user.token

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

   const result= await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/consulting/${data.id}`,
        {method:"PUT",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body: JSON.stringify(data)
        }
    )

    if(!result.ok)  throw new Error("Failed to update category")

        revalidatePath("/dashboard/consulting")
          return result.json();


}