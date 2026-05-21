import { NextResponse } from "next/server";
import { updateMemberOrder } from "@/app/models/db/lib/services/outTeam";
export const PUT = async (request: Request) => {
  try {
    const body = await request.json();
    const result = await updateMemberOrder(body);
    return NextResponse.json(
      { data: result, message: "The Order has been Updated successfully" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Error in updating the order" },
      { status: 500 },
    );
  }
};
