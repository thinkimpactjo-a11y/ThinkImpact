import pool from "../index";

import { type newService, type getService } from "@/types/index";

export const addNewService = async (newService: newService) => {
  try {
    const result = await pool.query<newService>(
      "insert into services (name_en,name_ar,description_en,description_ar,category_id,image) values ($1,$2,$3,$4,$5,$6) returning *",
      [
        newService.name_en,
        newService.name_ar,
        newService.description_en,
        newService.description_ar,
        newService.category_id,
        newService.image,
      ],
    );

    return {
      success: true,
      message: "Service added successfully",
      statusCode: 201,
      data: result.rows[0] ?? null,
    };
  } catch (error) {
    console.error("Error adding service:", error);
    return {
      success: false,
      message: "Failed to add service",
      statusCode: 500,
      data: null,
    };
  }
};

export const getAllServices = async () => {
  try {
    const result = await pool.query<getService>(
      "SELECT services. *, consulting.id AS category_id, consulting.category_name_en, consulting.category_name_ar, consulting.description_en,consulting.description_ar FROM services INNER JOIN consulting ON services.category_id = consulting.id",
    );
    return {
      success: true,
      message: "Services fetched successfully",
      statusCode: 200,
      data: result.rows,
    };
  } catch (error) {
    console.error("Error fetching services:", error);
    return {
      success: false,
      message: "Failed to fetch services",
      statusCode: 500,
      data: null,
    };
  }
};

export const editService = async (id: string, modifiedService: newService) => {
  try {
    const isValidId = await pool.query("select * from services where id=$1 ", [
      id,
    ]);
    if (isValidId.rows.length === 0) {
      return {
        success: false,
        message: "Service not found",
        statusCode: 404,
        data: null,
      };
    }

    const result = await pool.query<newService>(
      " update services  set name_en= coalesce ($2,name_en ), name_ar = coalesce ($3,name_ar ) ,description_en = coalesce ($4,description_en) ,description_ar = coalesce($5,description_ar),category_id= coalesce($6,category_id), image= coalesce($7,image) where id= $1 returning * ",
      [
        id,
        modifiedService.name_en,
        modifiedService.name_ar,
        modifiedService.description_en,
        modifiedService.description_ar,
        modifiedService.category_id,
        modifiedService.image,
      ],
    );
    return {
      success: true,
      message: "Service updated successfully",
      statusCode: 200,
      data: result.rows[0] ?? null,
    };
  } catch (error) {
    console.error("Error editing service:", error);
    return {
      success: false,
      message: "Failed to update service",
      statusCode: 500,
      data: null,
    };
  }
};

export const deleteService = async (id: string) => {
  try {
    const isValidId = await pool.query("select * from services where id=$1 ", [
      id,
    ]);
    if (isValidId.rows.length === 0) {
      return {
        success: false,
        message: "Service not found",
        statusCode: 404,
        data: null,
      };
    }

    await pool.query("delete from services where id=$1", [id]);
    return {
      success: true,
      message: "Service deleted successfully",
      statusCode: 200,
      data: null,
    };
  } catch (error) {
    console.error("Error deleting service:", error);
    return {
      success: false,
      message: "Failed to delete service",
      statusCode: 500,
      data: null,
    };
  }
};
export const getServiceByCategoryId = async (id: string) => {
  try {
    const result = await pool.query(
      "SELECT * FROM services WHERE category_id=$1",
      [id],
    );
    return {
      success: true,
      message: "Services fetched successfully",
      statusCode: 200,
      data: result.rows,
    };
  } catch (error) {
    console.error("Error fetching services by category id:", error);
    return {
      success: false,
      message: "Failed to fetch services",
      statusCode: 500,
      data: null,
    };
  }
};

export const getServiceById = async (id: string) => {
  try {
    const result = await pool.query("SELECT * FROM services WHERE id=$1", [id]);
    if (result.rows.length === 0) {
      return {
        success: false,
        message: "Service not found",
        statusCode: 404,
        data: null,
      };
    }
    return {
      success: true,
      message: "Service fetched successfully",
      statusCode: 200,
      data: result.rows[0] ?? null,
    };
  } catch (error) {
    console.error("Error fetching service by id:", error);
    return {
      success: false,
      message: "Failed to fetch service",
      statusCode: 500,
      data: null,
    };
  }
};
