"use server"
import { authOptions } from "@/app/models/db/authOptions";
import {  newTraining } from "@/types";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";


export async function editTraining (data:newTraining){
    const session= await getServerSession(authOptions)
    const token= session?.user.token

   const result= await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/training/${data.id}`,
        {method:"PUT",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body: JSON.stringify(data)
        }
    )

    if(!result.ok)  throw new Error("Failed to update Training")

        revalidatePath("/dashboard/training")
          return result.json();


}