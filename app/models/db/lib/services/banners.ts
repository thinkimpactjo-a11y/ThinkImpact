"use server";

import { newBanner } from "@/types";
import pool from "../index";

export const addNewBanner = async (newBanner: newBanner) => {
  try {
    const result = await pool.query(
      "insert into banners (alt, description_en, description_ar, image) values ($1,$2,$3,$4)",
      [
        newBanner.alt,
        newBanner.description_en,
        newBanner.description_ar,
        newBanner.image,
      ],
    );

    return {
      success: true,
      message: "Banner added successfully",
      statusCode: 201,
      data: result.rows[0] ?? null,
    };
  } catch (error) {
    console.error("Error adding banner:", error);
    return {
      success: false,
      message: "Failed to add banner",
      statusCode: 500,
      data: null,
    };
  }
};

export const getBannerData = async () => {
  try {
    const result = await pool.query<newBanner>("select * from banners");

    return {
      success: true,
      message: "Banner data fetched successfully",
      statusCode: 200,
      data: result.rows,
    };
  } catch (error) {
    console.error("Error fetching banner data:", error);
    return {
      success: false,
      message: "Failed to fetch banner data",
      statusCode: 500,
      data: null,
    };
  }
};

export const getBannerbyId = async (id: string) => {
  try {
    const result = await pool.query<newBanner>(
      "select * from banners where id=$1",
      [id],
    );

    if (result.rows.length === 0) {
      return {
        success: false,
        message: "Banner not found",
        statusCode: 404,
        data: null,
      };
    }

    return {
      success: true,
      message: "Banner fetched successfully",
      statusCode: 200,
      data: result.rows[0] ?? null,
    };
  } catch (error) {
    console.error("Error fetching banner by id:", error);
    return {
      success: false,
      message: "Failed to fetch banner",
      statusCode: 500,
      data: null,
    };
  }
};

export const editBanner = async (id: string, modifiedCategory: Partial<newBanner>) => {
  try {
    const isValidId = await pool.query("select * from banners where id=$1 ", [
      id,
    ]);
    if (isValidId.rows.length === 0) {
      return {
        success: false,
        message: "Banner not found",
        statusCode: 404,
        data: null,
      };
    }

    const result = await pool.query<newBanner>(
      " update banners set alt= coalesce ($2,alt ), description_en = coalesce ($3,description_en) ,description_ar = coalesce($4,description_ar),image= coalesce($5,image) where id= $1 returning * ",
      [
        id,
        modifiedCategory.alt,
        modifiedCategory.description_en,
        modifiedCategory.description_ar,
        modifiedCategory.image,
      ],
    );

    return {
      success: true,
      message: "Banner updated successfully",
      statusCode: 200,
      data: result.rows[0] ?? null,
    };
  } catch (error) {
    console.error("Error editing banner:", error);
    return {
      success: false,
      message: "Failed to update banner",
      statusCode: 500,
      data: null,
    };
  }
};

export const deleteBanner = async (id: string) => {
  try {
    const isValidId = await pool.query("select * from banners where id=$1 ", [
      id,
    ]);
    if (isValidId.rows.length === 0) {
      return {
        success: false,
        message: "Banner not found",
        statusCode: 404,
        data: null,
      };
    }

    await pool.query("delete from banners where id=$1", [id]);

    return {
      success: true,
      message: "Banner deleted successfully",
      statusCode: 200,
      data: null,
    };
  } catch (error) {
    console.error("Error deleting banner:", error);
    return {
      success: false,
      message: "Failed to delete banner",
      statusCode: 500,
      data: null,
    };
  }
};
