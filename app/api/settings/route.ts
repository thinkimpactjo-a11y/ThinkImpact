import { NextResponse } from "next/server";
import { addNewSetting } from "@/app/models/db/lib/services/settings";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const result = await addNewSetting(body);

    return NextResponse.json(
      { data: result, message: "The Setting has been added successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Error in adding the new Setting" },
      { status: 500 }
    );
  }
};