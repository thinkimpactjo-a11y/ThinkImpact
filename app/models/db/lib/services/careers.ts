import { newCareer } from "@/types";
import pool from "..";

export const createNewApplication = async (application: newCareer) => {
  try {
    const result = await pool.query<newCareer>(
      "insert into careers (first_name,last_name, email,phone_number,city,cv,area_of_expertise) values ($1,$2,$3,$4,$5,$6,$7) returning *",
      [
        application.first_name,
        application.last_name,
        application.email,
        application.phone_number,
        application.city,
        application.cv,
        application.area_of_expertise,
      ],
    );

    return {
      success: true,
      message: "Application created successfully",
      statusCode: 201,
      data: result.rows[0] ?? null,
    };
  } catch (error) {
    console.error("Error creating application:", error);
    return {
      success: false,
      message: "Failed to create application",
      statusCode: 500,
      data: null,
    };
  }
};

export const getAllApplications = async () => {
  try {
    const result = await pool.query<newCareer>("select * from careers ");
    return {
      success: true,
      message: "Applications fetched successfully",
      statusCode: 200,
      data: result.rows,
    };
  } catch (error) {
    console.error("Error fetching applications:", error);
    return {
      success: false,
      message: "Failed to fetch applications",
      statusCode: 500,
      data: null,
    };
  }
};

export const deleteApplications = async (id: string) => {
  try {
    const isValidId = await pool.query("select * from careers where id=$1 ", [
      id,
    ]);
    if (isValidId.rows.length === 0) {
      return {
        success: false,
        message: "Application not found",
        statusCode: 404,
        data: null,
      };
    }

    await pool.query("delete from careers where id=$1", [id]);

    return {
      success: true,
      message: "Application deleted successfully",
      statusCode: 200,
      data: null,
    };
  } catch (error) {
    console.error("Error deleting application:", error);
    return {
      success: false,
      message: "Failed to delete application",
      statusCode: 500,
      data: null,
    };
  }
};

export const getApplicationById = async (id: string) => {
  try {
    const result = await pool.query<newCareer>(
      "select * from careers where id=$1 ",
      [id],
    );

    if (result.rows.length === 0) {
      return {
        success: false,
        message: "Application not found",
        statusCode: 404,
        data: null,
      };
    }

    return {
      success: true,
      message: "Application fetched successfully",
      statusCode: 200,
      data: result.rows[0] ?? null,
    };
  } catch (error) {
    console.error("Error fetching application by id:", error);
    return {
      success: false,
      message: "Failed to fetch application",
      statusCode: 500,
      data: null,
    };
  }
};
