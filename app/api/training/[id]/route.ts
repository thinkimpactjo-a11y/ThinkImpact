import { NextResponse } from "next/server";
import { deleteTraining, editTraining } from "@/app/models/db/lib/services/training";

export const PUT = async (
  request: Request,
  params: {
    params: Promise<{ id: string }>;
  }
) => {
  try {
    const { id } = await params.params;
    const body = await request.json();
    const result = await editTraining(id, body);

    if (result === null) {
      return NextResponse.json(
        {
          data: result,
          message: `No training with this id: ${id}`,
        },
        { status: 409 }
      );
    } else {
      return NextResponse.json(
        {
          data: result,
          message: "The training has been updated successfully",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Error in updating The training" },
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
    const result = await deleteTraining(id);

    if (result === null) {
      return NextResponse.json(
        {
          data: result,
          message: `No training with this id: ${id}`,
        },
        { status: 409 }
      );
    } else {
      return NextResponse.json(
        {
          data: result,
          message: "The training has been deleted successfully",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Error in deleting The training" },
      { status: 500 }
    );
  }
};