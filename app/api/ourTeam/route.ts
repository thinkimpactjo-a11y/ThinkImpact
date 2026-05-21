import { NextResponse } from "next/server";

import {
  addNewMember,
  getAllMembers,
} from "@/app/models/db/lib/services/outTeam";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const result = await addNewMember(body);
    return NextResponse.json(
      { data: result, message: "The member has been added successfully" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Error in adding the new member" },
      { status: 500 },
    );
  }
};

export const GET = async () => {
  try {
    const result = await getAllMembers();
    return NextResponse.json(
      { data: result, message: "All Clients" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Error in getting the client" },
      { status: 500 },
    );
  }
};
