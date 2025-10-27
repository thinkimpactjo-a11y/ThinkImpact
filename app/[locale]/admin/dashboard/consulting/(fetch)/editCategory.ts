"use server"
import { authOptions } from "@/app/models/db/authOptions";
import { newCategory } from "@/types";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";


export async function editCategory (data:newCategory){
    const session= await getServerSession(authOptions)
    const token= session?.user.token

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