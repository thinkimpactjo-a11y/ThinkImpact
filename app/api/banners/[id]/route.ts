import { NextResponse } from "next/server";
import { type tokenPayload } from "../../consulting/route";
import jwt, { Secret } from "jsonwebtoken";
import { deleteBanner, editBanner } from "@/app/models/db/lib/services/banners";

export const PUT = async (
  request: Request,
  params: {
    params: Promise<{ id: string }>;
  },
) => {
  try {
    const { id } = await params.params;
    const body = await request.json();
    const result = await editBanner(id, body);
    if (result === null) {
      return NextResponse.json(
        {
          data: result,
          message: `No Banner with this id: ${id}`,
        },
        { status: 409 },
      );
    } else {
      return NextResponse.json(
        {
          data: result,
          message: "The Banner has been updated successfully",
        },
        { status: 201 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Error in updating The Banner" },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  request: Request,
  params: {
    params: Promise<{ id: string }>;
  },
) => {
  try {
    const { id } = await params.params;
    const result = await deleteBanner(id);

    if (result === null) {
      return NextResponse.json(
        {
          data: result,
          message: `No banner with this id: ${id}`,
        },
        { status: 409 },
      );
    } else {
      return NextResponse.json(
        {
          data: result,
          message: "The banner has been deleted successfully",
        },
        { status: 201 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Error in deleting The banner" },
      { status: 500 },
    );
  }
};
