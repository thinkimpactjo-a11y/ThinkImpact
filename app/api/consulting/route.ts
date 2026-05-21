import {
  addNewCategory,
  getAllcategories,
} from "@/app/models/db/lib/services/consulting";
import { NextResponse } from "next/server";

export type tokenPayload = {
  user_id: string;
  role: string;
  name: string;
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const result = await addNewCategory(body);

    return NextResponse.json(
      { data: result, message: "The category has been added successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Error in adding the new category" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const result = await getAllcategories();

    return NextResponse.json(
      { data: result, message: "All categories" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Error in getting the categories" },
      { status: 500 }
    );
  }
};