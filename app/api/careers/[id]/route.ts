import { NextResponse } from "next/server";

import { deleteApplications, getApplicationById } from "@/app/models/db/lib/services/careers";

export const DELETE = async (
 request:Request,
  params: {
    params: Promise<{ id: string }>;
  }
) => {
  try {
    const { id } = await params.params;
    const result = await deleteApplications(id);

    if (result === null) {
      return NextResponse.json(
        {
          data: result,
          message: `No Application with this id: ${id}`,
        },
        { status: 409 }
      );
    } else {
      return NextResponse.json(
        {
          data: result,
          message: "The Application has been deleted successfully",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Error in deleting The Client" },
      { status: 500 }
    );
  }
};

export const GET = async (
request:Request,
  params: {
    params: Promise<{ id: string }>
  }
) => {
  try {
    const { id } = await params.params;
    const result = await getApplicationById(id);

    return NextResponse.json(
      { data: result, message: "Application" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Error in getting the Application" },
      { status: 500 }
    );
  }
};