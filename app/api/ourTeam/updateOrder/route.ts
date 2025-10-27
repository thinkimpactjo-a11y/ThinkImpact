
import { NextResponse } from "next/server";
import Jwt, { Secret } from "jsonwebtoken";
import { type tokenPayload } from "../../consulting/route";
import { updateMemberOrder } from "@/app/models/db/lib/services/outTeam";
export const PUT= async (request:Request)=>{

   try {
       const authHeader = request.headers.get("authorization")?.split(" ")[1];
       if (!authHeader) {
         return NextResponse.json({ message: "Unauthenticated" }, { status: 501 });
       } else {
         const payload = Jwt.verify(
           authHeader,
           process.env.NEXTAUTH_SECRET as Secret
         ) as tokenPayload;
         if (payload.role !== "admin") {
           return NextResponse.json({ message: "Unauthorized" }, { status: 501 });
         } else {
           const body = await request.json();
           const result = await updateMemberOrder(body);
           return NextResponse.json(
             { data: result, message: "The Order has been Updated successfully" },
             { status: 201 }
           );
         }
       }
     } catch (error) {
       return NextResponse.json(
         { data: error, message: "Error in updating the order" },
         { status: 500 }
       );
     }
}