import pool from "../index";

import { newTraining } from "@/types/index";

export const addNewTraining = async (newTraining: newTraining) => {
  try {
    const maxOrderResult = await pool.query<{ max_sort: number }>(
      `SELECT COALESCE(MAX(sort_order), 0) AS max_sort FROM training`,
    );

    const nextSortOrder = maxOrderResult.rows[0].max_sort + 1;

    const result = await pool.query<newTraining>(
      `INSERT INTO training 
        (name_en, name_ar, description_en, description_ar, slug, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        newTraining.name_en,
        newTraining.name_ar,
        newTraining.description_en,
        newTraining.description_ar,
        newTraining.slug,
        nextSortOrder,
      ],
    );

    return {
      success: true,
      message: "Training added successfully",
      statusCode: 201,
      data: result.rows[0] ?? null,
    };
  } catch (error) {
    console.error("Error adding training:", error);
    return {
      success: false,
      message: "Failed to add training",
      statusCode: 500,
      data: null,
    };
  }
};

export const getAllTraining = async () => {
  try {
    const result = await pool.query<newTraining>(
      "select * from training ORDER BY sort_order ASC",
    );
    return {
      success: true,
      message: "Training records fetched successfully",
      statusCode: 200,
      data: result.rows,
    };
  } catch (error) {
    console.error("Error fetching training records:", error);
    return {
      success: false,
      message: "Failed to fetch training records",
      statusCode: 500,
      data: null,
    };
  }
};

export const editTraining = async (
  id: string,
  modifiedTraining: newTraining,
) => {
  try {
    const isValidId = await pool.query("select * from training where id=$1 ", [
      id,
    ]);
    if (isValidId.rows.length === 0) {
      return {
        success: false,
        message: "Training record not found",
        statusCode: 404,
        data: null,
      };
    }

    const result = await pool.query<newTraining>(
      " update training set name_en= coalesce ($2,name_en ), name_ar = coalesce ($3,name_ar ) ,description_en = coalesce ($4,description_en) ,description_ar = coalesce($5,description_ar),slug = coalesce($6,slug) where id= $1 returning * ",
      [
        id,
        modifiedTraining.name_en,
        modifiedTraining.name_ar,
        modifiedTraining.description_en,
        modifiedTraining.description_ar,
        modifiedTraining.slug,
      ],
    );
    return {
      success: true,
      message: "Training updated successfully",
      statusCode: 200,
      data: result.rows[0] ?? null,
    };
  } catch (error) {
    console.error("Error editing training:", error);
    return {
      success: false,
      message: "Failed to update training",
      statusCode: 500,
      data: null,
    };
  }
};

export const deleteTraining = async (id: string) => {
  try {
    const isValidId = await pool.query("select * from training where id=$1 ", [
      id,
    ]);
    if (isValidId.rows.length === 0) {
      return {
        success: false,
        message: "Training record not found",
        statusCode: 404,
        data: null,
      };
    }

    await pool.query("delete from training where id=$1", [id]);
    return {
      success: true,
      message: "Training deleted successfully",
      statusCode: 200,
      data: null,
    };
  } catch (error) {
    console.error("Error deleting training:", error);
    return {
      success: false,
      message: "Failed to delete training",
      statusCode: 500,
      data: null,
    };
  }
};

export const getTrainingById = async (id: string) => {
  try {
    const result = await pool.query<newTraining>(
      "SELECT * FROM training  WHERE id=$1",
      [id],
    );
    if (result.rows.length === 0) {
      return {
        success: false,
        message: "Training record not found",
        statusCode: 404,
        data: null,
      };
    }
    return {
      success: true,
      message: "Training fetched successfully",
      statusCode: 200,
      data: result.rows[0] ?? null,
    };
  } catch (error) {
    console.error("Error fetching training by id:", error);
    return {
      success: false,
      message: "Failed to fetch training",
      statusCode: 500,
      data: null,
    };
  }
};

export const getTrainingBySlug = async (slug: string) => {
  try {
    const result = await pool.query<newTraining>(
      "SELECT * FROM training  WHERE slug=$1",
      [slug],
    );
    if (result.rows.length === 0) {
      return {
        success: false,
        message: "Training record not found",
        statusCode: 404,
        data: null,
      };
    }
    return {
      success: true,
      message: "Training fetched successfully",
      statusCode: 200,
      data: result.rows[0] ?? null,
    };
  } catch (error) {
    console.error("Error fetching training by slug:", error);
    return {
      success: false,
      message: "Failed to fetch training",
      statusCode: 500,
      data: null,
    };
  }
};
