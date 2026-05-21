import { NextResponse } from "next/server";
import { addNewClient, getAllClients } from "@/app/models/db/lib/services/clients";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const result = await addNewClient(body);

    return NextResponse.json(
      { data: result, message: "The client has been added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("api error: ",error);
    
    return NextResponse.json(
      { data: error, message: "Error in adding the new client" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const result = await getAllClients();
    return NextResponse.json(
      { data: result, message: "All Clients" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Error in getting the client" },
      { status: 500 }
    );
  }
};