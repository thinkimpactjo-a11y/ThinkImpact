"use server";

import { newSetting } from "@/types";
import pool from "../index";

export const addNewSetting = async (newSetting: newSetting) => {
  try {
    const result = await pool.query(
      "insert into settings (key_name_en, key_name_ar, value_en, value_ar) values ($1,$2,$3,$4)",
      [
        newSetting.key_name_en,
        newSetting.key_name_ar,
        newSetting.value_en,
        newSetting.value_ar,
      ],
    );

    return {
      success: true,
      message: "Setting added successfully",
      statusCode: 201,
      data: result.rows[0] ?? null,
    };
  } catch (error) {
    console.error("Error adding setting:", error);
    return {
      success: false,
      message: "Failed to add setting",
      statusCode: 500,
      data: null,
    };
  }
};

export const getSettingsData = async () => {
  try {
    const result = await pool.query<newSetting>("select * from settings");

    return {
      success: true,
      message: "Settings fetched successfully",
      statusCode: 200,
      data: result.rows,
    };
  } catch (error) {
    console.error("Error fetching settings:", error);
    return {
      success: false,
      message: "Failed to fetch settings",
      statusCode: 500,
      data: null,
    };
  }
};

export const getSettingbyId = async (id: string) => {
  try {
    const result = await pool.query<newSetting>(
      "select * from settings where id=$1",
      [id],
    );

    if (result.rows.length === 0) {
      return {
        success: false,
        message: "Setting not found",
        statusCode: 404,
        data: null,
      };
    }

    return {
      success: true,
      message: "Setting fetched successfully",
      statusCode: 200,
      data: result.rows[0] ?? null,
    };
  } catch (error) {
    console.error("Error fetching setting by id:", error);
    return {
      success: false,
      message: "Failed to fetch setting",
      statusCode: 500,
      data: null,
    };
  }
};

export const editSetting = async (id: string, modifiedSettings: newSetting) => {
  try {
    const isValidId = await pool.query("select * from settings where id=$1 ", [
      id,
    ]);
    if (isValidId.rows.length === 0) {
      return {
        success: false,
        message: "Setting not found",
        statusCode: 404,
        data: null,
      };
    }

    const result = await pool.query<newSetting>(
      " update settings set key_name_en= coalesce ($2,key_name_en ), key_name_ar = coalesce ($3,key_name_ar) ,value_en = coalesce($4,value_en),value_ar= coalesce($5,value_ar) where id= $1 returning * ",
      [
        id,
        modifiedSettings.key_name_en,
        modifiedSettings.key_name_ar,
        modifiedSettings.value_en,
        modifiedSettings.value_ar,
      ],
    );
    return {
      success: true,
      message: "Setting updated successfully",
      statusCode: 200,
      data: result.rows[0] ?? null,
    };
  } catch (error) {
    console.error("Error editing setting:", error);
    return {
      success: false,
      message: "Failed to update setting",
      statusCode: 500,
      data: null,
    };
  }
};

export const deleteSettings = async (id: string) => {
  try {
    const isValidId = await pool.query("select * from settings where id=$1 ", [
      id,
    ]);
    if (isValidId.rows.length === 0) {
      return {
        success: false,
        message: "Setting not found",
        statusCode: 404,
        data: null,
      };
    }

    await pool.query("delete from settings where id=$1", [id]);
    return {
      success: true,
      message: "Setting deleted successfully",
      statusCode: 200,
      data: null,
    };
  } catch (error) {
    console.error("Error deleting setting:", error);
    return {
      success: false,
      message: "Failed to delete setting",
      statusCode: 500,
      data: null,
    };
  }
};
