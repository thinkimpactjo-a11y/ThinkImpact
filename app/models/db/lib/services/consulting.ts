"use server";

import pool from "../index";
import { newCategory } from "@/types/index";

export const addNewCategory = async (newCategory: newCategory) => {
  try {
    const maxOrderResult = await pool.query<{ max_sort: number }>(
      `SELECT COALESCE(MAX(sort_order), 0) AS max_sort FROM consulting`,
    );

    const nextSortOrder = maxOrderResult.rows[0].max_sort + 1;

    const result = await pool.query<newCategory>(
      `INSERT INTO consulting 
        (category_name_en, category_name_ar, description_en, description_ar, category_logo, slug, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [
        newCategory.category_name_en,
        newCategory.category_name_ar,
        newCategory.description_en,
        newCategory.description_ar,
        newCategory.category_logo,
        newCategory.slug,
        nextSortOrder,
      ],
    );

    return {
      success: true,
      message: "Category added successfully",
      statusCode: 201,
      data: result.rows[0] ?? null,
    };
  } catch (error) {
    console.error("Error adding category:", error);
    return {
      success: false,
      message: "Failed to add category",
      statusCode: 500,
      data: null,
    };
  }
};

export const getAllcategories = async () => {
  try {
    const result = await pool.query<newCategory>(
      "SELECT * FROM consulting ORDER BY sort_order ASC",
    );
    return {
      success: true,
      message: "Categories fetched successfully",
      statusCode: 200,
      data: result.rows,
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      success: false,
      message: "Failed to fetch categories",
      statusCode: 500,
      data: null,
    };
  }
};

export const editCategory = async (
  id: string,
  modifiedCategory: newCategory,
) => {
  try {
    const existing = await pool.query("SELECT * FROM consulting WHERE id=$1", [
      id,
    ]);

    if (existing.rows.length === 0) {
      return {
        success: false,
        message: "Category not found",
        statusCode: 404,
        data: null,
      };
    }

    const result = await pool.query<newCategory>(
      `UPDATE consulting SET 
        category_name_en = COALESCE($2, category_name_en),
        category_name_ar = COALESCE($3, category_name_ar),
        description_en = COALESCE($4, description_en),
        description_ar = COALESCE($5, description_ar),
        category_logo = COALESCE($6, category_logo),
        slug = COALESCE($7, slug)
       WHERE id = $1 RETURNING *`,
      [
        id,
        modifiedCategory.category_name_en,
        modifiedCategory.category_name_ar,
        modifiedCategory.description_en,
        modifiedCategory.description_ar,
        modifiedCategory.category_logo,
        modifiedCategory.slug,
      ],
    );

    return {
      success: true,
      message: "Category updated successfully",
      statusCode: 200,
      data: result.rows[0] ?? null,
    };
  } catch (error) {
    console.error("Error editing category:", error);
    return {
      success: false,
      message: "Failed to update category",
      statusCode: 500,
      data: null,
    };
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const existing = await pool.query("SELECT * FROM consulting WHERE id=$1", [
      id,
    ]);

    if (existing.rows.length === 0) {
      return {
        success: false,
        message: "Category not found",
        statusCode: 404,
        data: null,
      };
    }

    await pool.query("DELETE FROM consulting WHERE id=$1", [id]);

    return {
      success: true,
      message: "Category deleted successfully",
      statusCode: 200,
      data: null,
    };
  } catch (error) {
    console.error("Error deleting category:", error);
    return {
      success: false,
      message: "Failed to delete category",
      statusCode: 500,
      data: null,
    };
  }
};

export const getCaregoryByslug = async (slug: string) => {
  try {
    const result = await pool.query<newCategory>(
      "SELECT * FROM consulting  WHERE slug=$1",
      [slug],
    );

    if (result.rows.length === 0) {
      return {
        success: false,
        message: "Category not found",
        statusCode: 404,
        data: null,
      };
    }

    return {
      success: true,
      message: "Category fetched successfully",
      statusCode: 200,
      data: result.rows[0] ?? null,
    };
  } catch (error) {
    console.error("Error fetching category by slug:", error);
    return {
      success: false,
      message: "Failed to fetch category",
      statusCode: 500,
      data: null,
    };
  }
};

export const getCaregoryById = async (id: string) => {
  try {
    const result = await pool.query<newCategory>(
      "SELECT * FROM consulting  WHERE id=$1",
      [id],
    );

    if (result.rows.length === 0) {
      return {
        success: false,
        message: "Category not found",
        statusCode: 404,
        data: null,
      };
    }

    return {
      success: true,
      message: "Category fetched successfully",
      statusCode: 200,
      data: result.rows[0] ?? null,
    };
  } catch (error) {
    console.error("Error fetching category by id:", error);
    return {
      success: false,
      message: "Failed to fetch category",
      statusCode: 500,
      data: null,
    };
  }
};
