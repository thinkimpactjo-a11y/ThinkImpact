import { NextResponse } from "next/server";
import { editUser, removeUser } from "@/app/models/db/lib/services/users";

export const PUT = async (
  request: Request,
  params: {
    params: Promise<{ id: string }>;
  }
) => {
  try {
    const { id } = await params.params;
    const body = await request.json();
    const result = await editUser(id, body);

    if (result === null) {
      return NextResponse.json(
        {
          data: result,
          message: `No user with this id: ${id}`,
        },
        { status: 409 }
      );
    } else {
      return NextResponse.json(
        {
          data: result,
          message: "The User role has been updated successfully",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Error in updating the user role" },
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
    const result = await removeUser(id);

    if (result === null) {
      return NextResponse.json(
        {
          data: result,
          message: `No user with this id: ${id}`,
        },
        { status: 409 }
      );
    } else {
      return NextResponse.json(
        {
          data: result,
          message: "The user has been deleted successfully",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Error in deleting The user", },
      { status: 500 }
    );
  }
};