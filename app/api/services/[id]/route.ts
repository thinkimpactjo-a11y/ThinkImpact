import { NextResponse } from "next/server";
import { deleteService, editService } from "@/app/models/db/lib/services/services";

export const PUT = async (
  request: Request,
  params: {
    params: Promise<{ id: string }>;
  }
) => {
  try {
    const { id } = await params.params;
    const body = await request.json();
    const result = await editService(id, body);

    if (result === null) {
      return NextResponse.json(
        {
          data: result,
          message: `No service with this id: ${id}`,
        },
        { status: 409 }
      );
    } else {
      return NextResponse.json(
        {
          data: result,
          message: "The service has been updated successfully",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Error in updating The service" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  request: Request,
  params: {
    params: Promise<{ id: string }>
  }
) => {
  try {
    const { id } = await params.params;
    const result = await deleteService(id);

    if (result === null) {
      return NextResponse.json(
        {
          data: result,
          message: `No service with this id: ${id}`,
        },
        { status: 409 }
      );
    } else {
      return NextResponse.json(
        {
          data: result,
          message: "The service has been deleted successfully",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Error in deleting The service" },
      { status: 500 }
    );
  }
};