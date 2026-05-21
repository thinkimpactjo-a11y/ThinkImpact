import { NextResponse } from "next/server"
import { addNewBanner } from "@/app/models/db/lib/services/banners";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const result = await addNewBanner(body);

    return NextResponse.json(
      { data: result, message: "The Banner has been added successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Error in adding the new Banner" },
      { status: 500 }
    );
  }
};