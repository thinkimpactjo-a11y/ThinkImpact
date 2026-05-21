import { NextResponse } from "next/server";
import { addNewCourse, getAllCourses } from "@/app/models/db/lib/services/courses";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const result = await addNewCourse(body);

    return NextResponse.json(
      {
        data: result,
        message: "The course has been added successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("error 333: ", error);

    return NextResponse.json(
      { data: error, message: "Error in adding The course" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const result = await getAllCourses();

    return NextResponse.json(
      {
        data: result,
        message: "All Courses",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Error in getting The Courses" },
      { status: 500 }
    );
  }
};