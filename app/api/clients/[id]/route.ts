import { NextResponse } from "next/server";
import { deleteClient, editClients } from "@/app/models/db/lib/services/clients";

export const PUT = async (
  request: Request,
  params: {
    params: Promise<{ id: string }>;
  }
) => {
  try {
    const { id } = await params.params;
    const body = await request.json();
    const result = await editClients(id, body);

    if (result === null) {
      return NextResponse.json(
        {
          data: result,
          message: `No client with this id: ${id}`,
        },
        { status: 409 }
      );
    } else {
      return NextResponse.json(
        {
          data: result,
          message: "The client has been updated successfully",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Error in updating The client" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  request: Request,
  params: {
    params: Promise<{ id: string }>;
  }
) => {
  try {
    const { id } = await params.params;
    const result = await deleteClient(id);

    if (result === null) {
      return NextResponse.json(
        {
          data: result,
          message: `No Client with this id: ${id}`,
        },
        { status: 409 }
      );
    } else {
      return NextResponse.json(
        {
          data: result,
          message: "The Client has been deleted successfully",
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