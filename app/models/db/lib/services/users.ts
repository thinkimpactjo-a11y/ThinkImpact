import { pool } from "../index";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

import { newUser, modifiedUser, DBUser, userInfo } from "@/types/index";
const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const checkPassword = async (password: string, hashedPasword: string) => {
  const isMatch = await bcrypt.compare(password, hashedPasword);
  return isMatch;
};

export const register = async (newUser: newUser) => {
  const checkEmail = await pool.query("select * from users where email=$1 ", [
    newUser.email.toLowerCase(),
  ]);

  if (checkEmail.rows.length > 0) {
    return { data: null, message: "The Email Is Already Exist" };
  } else {
    const result = await pool.query<newUser>(
      "insert into users (first_name, last_name, email, password) values ($1,$2,$3,$4) returning *",
      [
        newUser.first_name,
        newUser.last_name,
        newUser.email.toLowerCase(),
        await hashPassword(newUser.password),
      ],
    );

    return { message: "registered successfully", data: result.rows };
  }
};

export const login = async (userInfo: userInfo) => {
  const result = await pool.query<DBUser>(
    "select * from users where users.email= $1",
    [userInfo.email],
  );

  const dbUser = result.rows[0];

  if (result.rows.length === 0) {
    return null;
  } else {
    const isMatch = await checkPassword(
      userInfo.password,
      result.rows[0].password,
    );

    if (!isMatch) {
      return null;
    } else {
      const token = jwt.sign(
        {
          user_id: dbUser.id,
          role: dbUser.role,
          name: dbUser.first_name,
        },
        process.env.NEXTAUTH_SECRET as Secret,
        { expiresIn: "15d" },
      );
      return {
        id: dbUser.id,
        firstName: dbUser.first_name,
        lastName: dbUser.last_name ?? null,
        email: dbUser.email,
        role: dbUser.role,
        token: token,
      };
    }
  }
};

export const editUser = async (id: string, newRole: string) => {
  try {
    const user = await pool.query<modifiedUser>(
      "SELECT * FROM users WHERE id = $1",
      [id],
    );

    if (user.rows.length === 0) {
      return {
        success: false,
        message: "User not found",
        statusCode: 404,
        data: null,
      };
    }

    const result = await pool.query<modifiedUser>(
      `UPDATE users
       SET role = COALESCE($2, role)
       WHERE id = $1
       RETURNING *`,
      [id, newRole],
    );

    return {
      success: true,
      message: "User updated successfully",
      statusCode: 200,
      data: result.rows[0] ?? null,
    };
  } catch (error) {
    console.error("Error updating user:", error);

    return {
      success: false,
      message: "Failed to update user",
      statusCode: 500,
      data: null,
    };
  }
};

export const removeUser = async (id: string) => {
  try {
    const user = await pool.query<modifiedUser>(
      "SELECT * FROM users WHERE id = $1",
      [id],
    );

    if (user.rows.length === 0) {
      return {
        success: false,
        message: "User not found",
        statusCode: 404,
        data: null,
      };
    }

    const result = await pool.query<modifiedUser>(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id],
    );

    return {
      success: true,
      message: "User deleted successfully",
      statusCode: 200,
      data: result.rows[0] ?? null,
    };
  } catch (error) {
    console.error("Error deleting user:", error);

    return {
      success: false,
      message: "Failed to delete user",
      statusCode: 500,
      data: null,
    };
  }
};

export const getAllusers = async () => {
  const result = await pool.query<DBUser>("select * from users");
  return result.rows;
};

export const getUserById = async (id: string) => {
  const result = await pool.query<DBUser>(
    "select * from users where users.id=$1",
    [id],
  );

  return result.rows;
};
