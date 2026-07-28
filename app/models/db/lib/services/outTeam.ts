import pool from "../index";
import { newMember, memeberOrder } from "@/types";

type ServiceResponse<T = null> = {
  success: boolean;
  message: string;
  statusCode: number;
  data: T | null;
};

export const addNewMember = async (newMemberData: newMember) => {
  try {
    const displayOrder = await pool.query(
      "select COALESCE(MAX(display_order), 0) + 1 AS next_order from our_team"
    );
    const nextOrder = displayOrder.rows[0].next_order;

    const result = await pool.query<newMember>(
      "insert into our_team (name_en, name_ar, description_en, description_ar, position_en, position_ar, image, display_order,main) values ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning *",
      [
        newMemberData.name_en,
        newMemberData.name_ar,
        newMemberData.description_en,
        newMemberData.description_ar,
        newMemberData.position_en,
        newMemberData.position_ar,
        newMemberData.image,
        nextOrder,
        newMemberData.main,
      ]
    );

    return {
      success: true,
      message: "Member added successfully",
      statusCode: 201,
      data: result.rows[0] ?? null,
    };
  } catch (error) {
    console.error("Error adding new member:", error);
    return {
      success: false,
      message: "Failed to add member",
      statusCode: 500,
      data: null,
    };
  }
};

export const getAllMembers = async () => {
  try {
    const result = await pool.query(
      "select * from our_team ORDER BY display_order ASC"
    );

    return {
      success: true,
      message: "Members fetched successfully",
      statusCode: 200,
      data: result.rows,
    };
  } catch (error) {
    console.error("Error fetching members:", error);
    return {
      success: false,
      message: "Failed to fetch members",
      statusCode: 500,
      data: null,
    };
  }
};

export const editMember = async (
  id: string,
  modifiedMember: newMember
)=> {
  try {
    const isValidId = await pool.query("select * from our_team where id=$1 ", [
      id,
    ]);

    if (isValidId.rows.length === 0) {
      return {
        success: false,
        message: "Member not found",
        statusCode: 404,
        data: null,
      };
    }

    const result = await pool.query<newMember>(
      " update our_team set name_en = coalesce ($2,name_en ), name_ar = coalesce ($3,name_ar ), description_en= coalesce($4, description_en),description_ar= coalesce($5, description_ar), position_en= coalesce($6,position_en), position_ar= coalesce($7,position_ar), image= coalesce($8,image),display_order= coalesce($9,display_order),main= coalesce($10,main)   where id= $1 returning * ",
      [
        id,
        modifiedMember.name_en,
        modifiedMember.name_ar,
        modifiedMember.description_en,
        modifiedMember.description_ar,
        modifiedMember.position_en,
        modifiedMember.position_ar,
        modifiedMember.image,
        modifiedMember.display_order,
        modifiedMember.main,
      ]
    );

    return {
      success: true,
      message: "Member updated successfully",
      statusCode: 200,
      data: result.rows[0] ?? null,
    };
  } catch (error) {
    console.error("Error editing member:", error);
    return {
      success: false,
      message: "Failed to update member",
      statusCode: 500,
      data: null,
    };
  }
};

export const deleteMember = async (id: string) => {
  try {
    const isValidId = await pool.query("select * from our_team where id=$1 ", [
      id,
    ]);

    if (isValidId.rows.length === 0) {
      return {
        success: false,
        message: "Member not found",
        statusCode: 404,
        data: null,
      };
    }

    await pool.query("delete from our_team where id=$1 returning *", [id]);

    return {
      success: true,
      message: "Member deleted successfully",
      statusCode: 200,
      data: null,
    };
  } catch (error) {
    console.error("Error deleting member:", error);
    return {
      success: false,
      message: "Failed to delete member",
      statusCode: 500,
      data: null,
    };
  }
};

export const updateMemberOrder = async (
  clients: memeberOrder[]
) => {
  try {
    await pool.query("UPDATE our_team SET display_order = NULL");

    const queries = clients.map((client) =>
      pool.query("update our_team set display_order=$1 where id=$2", [
        client.display_order,
        client.id,
      ])
    );

    await Promise.all(queries);

    return {
      success: true,
      message: "Member order updated successfully",
      statusCode: 200,
      data: null,
    };
  } catch (error) {
    console.error("Error updating member order:", error);
    return {
      success: false,
      message: "Failed to update member order",
      statusCode: 500,
      data: null,
    };
  }
};

export const getMemberById = async (id: string) => {
  try {
    const result = await pool.query<newMember>("select * from our_team where id=$1 ", [id]);

    if (result.rows.length === 0) {
      return {
        success: false,
        message: "Member not found",
        statusCode: 404,
        data: null,
      };
    }

    return {
      success: true,
      message: "Member fetched successfully",
      statusCode: 200,
      data: result.rows[0] ?? null,
    };
  } catch (error) {
    console.error("Error fetching member by id:", error);
    return {
      success: false,
      message: "Failed to fetch member",
      statusCode: 500,
      data: null,
    };
  }
};
