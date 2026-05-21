import { NextResponse } from "next/server";
import { deleteSettings, editSetting } from "@/app/models/db/lib/services/settings";

export const PUT = async (
  request: Request,
  params: {
    params: Promise<{ id: string }>;
  }
) => {
  try {
    const { id } = await params.params;
    const body = await request.json();
    const result = await editSetting(id, body);

    if (result === null) {
      return NextResponse.json(
        {
          data: result,
          message: `No setting with this id: ${id}`,
        },
        { status: 409 }
      );
    } else {
      return NextResponse.json(
        {
          data: result,
          message: "The setting has been updated successfully",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Error in updating The setting" },
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
    const result = await deleteSettings(id);

    if (result === null) {
      return NextResponse.json(
        {
          data: result,
          message: `No setting with this id: ${id}`,
        },
        { status: 409 }
      );
    } else {
      return NextResponse.json(
        {
          data: result,
          message: "The setting has been deleted successfully",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Error in deleting The setting" },
      { status: 500 }
    );
  }
};