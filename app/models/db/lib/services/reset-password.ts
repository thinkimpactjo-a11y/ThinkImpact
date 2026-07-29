import pool from "../index";
import bcrypt from "bcrypt";
import { resetToken } from "@/types/index";
import { users } from "@/types/index";

const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const checkPassword = async (
  enteredPassword: string,
  currentPassword: string,
) => {
  const isMatch = bcrypt.compare(enteredPassword, currentPassword);
  return isMatch;
};

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    if (!token || !newPassword) {
      return {
        success: false,
        message: "Invalid request",
        statusCode: 400,
        data: null,
      };
    }

    const resetToken = await pool.query<resetToken>(
      "select * from reset_password_token where reset_password_token.token=$1 AND expires_at > NOW()",
      [token],
    );

    if (resetToken.rows.length === 0) {
      return {
        success: false,
        message: "Invalid or expired token",
        statusCode: 404,
        data: null,
      };
    }

    await pool.query("update users set password= $1 where users.id=$2", [
      await hashPassword(newPassword),
      resetToken.rows[0].user_id,
    ]);

    await pool.query("DELETE FROM reset_password_token WHERE token = $1", [
      token,
    ]);

    return {
      success: true,
      message: "Password has been reset successfully",
      statusCode: 200,
      data: true,
    };
  } catch (error) {
    console.error("Error resetting password:", error);
    return {
      success: false,
      message: "Failed to reset password",
      statusCode: 500,
      data: null,
    };
  }
};

export const changePassword = async (
  id: string,
  oldPassword: string,
  newPassword: string,
) => {
  try {
    const user = await pool.query<users>(
      "select * from users where users.id=$1",
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

    const isMatch = await checkPassword(oldPassword, user.rows[0].password);

    if (!isMatch) {
      return {
        success: false,
        message: "Old password is not correct",
        statusCode: 400,
        data: null,
      };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatePassword = await pool.query(
      "update users set password= $1 returning *",
      [hashedPassword],
    );

    return {
      success: true,
      message: "Password has been updated successfully",
      statusCode: 200,
      data: updatePassword.rows[0] ?? null,
    };
  } catch (error) {
    console.error("Error changing password:", error);
    return {
      success: false,
      message: "Failed to change password",
      statusCode: 500,
      data: null,
    };
  }
};
