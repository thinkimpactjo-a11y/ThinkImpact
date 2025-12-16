"use server"
import { authOptions } from "@/app/models/db/authOptions";
import { type editService } from "@/types";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

const EXPIRE_SECONDS = 15 * 24 * 60 * 60; // 15 days in seconds

export async function editService (data:editService){
    const session= await getServerSession(authOptions)
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
    const token= session?.user.token

   const result= await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/services/${data.id}`,
        {method:"PUT",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body: JSON.stringify(data)
        }
    )

    if(!result.ok)  throw new Error("Failed to update Service")

        revalidatePath("/dashboard/services")
          return result.json();


}