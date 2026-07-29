import pool from "../index";
import { newClient } from "@/types/index";

export const addNewClient = async (newClient: newClient) => {
  try {
    const result = await pool.query<newClient>(
      "insert into clients (name, logo) values ($1,$2) returning * ",
      [newClient.name, newClient.logo],
    );

    return {
      success: true,
      message: "Client added successfully",
      statusCode: 201,
      data: result.rows[0] ?? null,
    };
  } catch (error) {
    console.error("Error adding client:", error);
    return {
      success: false,
      message: "Failed to add client",
      statusCode: 500,
      data: null,
    };
  }
};

export const getAllClients = async () => {
  try {
    const result = await pool.query("select * from clients ");
    return {
      success: true,
      message: "Clients fetched successfully",
      statusCode: 200,
      data: result.rows,
    };
  } catch (error) {
    console.error("Error fetching clients:", error);
    return {
      success: false,
      message: "Failed to fetch clients",
      statusCode: 500,
      data: null,
    };
  }
};

export const editClients = async (id: string, modifiedClient: newClient) => {
  try {
    const isValidId = await pool.query("select * from clients where id=$1 ", [
      id,
    ]);
    if (isValidId.rows.length === 0) {
      return {
        success: false,
        message: "Client not found",
        statusCode: 404,
        data: null,
      };
    }

    const result = await pool.query<newClient>(
      " update clients  set name = coalesce ($2,name ), logo = coalesce ($3,logo ) where id= $1 returning * ",
      [id, modifiedClient.name, modifiedClient.logo],
    );

    return {
      success: true,
      message: "Client updated successfully",
      statusCode: 200,
      data: result.rows[0] ?? null,
    };
  } catch (error) {
    console.error("Error editing client:", error);
    return {
      success: false,
      message: "Failed to update client",
      statusCode: 500,
      data: null,
    };
  }
};

export const deleteClient = async (id: string) => {
  try {
    const isValidId = await pool.query("select * from clients where id=$1 ", [
      id,
    ]);
    if (isValidId.rows.length === 0) {
      return {
        success: false,
        message: "Client not found",
        statusCode: 404,
        data: null,
      };
    }

    await pool.query("delete from clients where id=$1", [id]);

    return {
      success: true,
      message: "Client deleted successfully",
      statusCode: 200,
      data: null,
    };
  } catch (error) {
    console.error("Error deleting client:", error);
    return {
      success: false,
      message: "Failed to delete client",
      statusCode: 500,
      data: null,
    };
  }
};
export const getClientbyId = async (id: string) => {
  try {
    const result = await pool.query<newClient>(
      "select * from clients where id=$1",
      [id],
    );

    if (result.rows.length === 0) {
      return {
        success: false,
        message: "Client not found",
        statusCode: 404,
        data: null,
      };
    }

    return {
      success: true,
      message: "Client fetched successfully",
      statusCode: 200,
      data: result.rows[0] ?? null,
    };
  } catch (error) {
    console.error("Error fetching client by id:", error);
    return {
      success: false,
      message: "Failed to fetch client",
      statusCode: 500,
      data: null,
    };
  }
};
