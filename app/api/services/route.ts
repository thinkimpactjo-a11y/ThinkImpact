import { NextResponse } from "next/server";
import { addNewService, getAllServices } from "@/app/models/db/lib/services/services";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const result = await addNewService(body);

    return NextResponse.json(
      {
        data: result,
        message: "The Service has been added successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Error in adding The Service" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const result = await getAllServices();

    return NextResponse.json(
      {
        data: result,
        message: "All Services",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Error in getting The Services" },
      { status: 500 }
    );
  }
};