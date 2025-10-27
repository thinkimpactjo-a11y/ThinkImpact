'use server';

import pool from "../index";
import { newCategory } from "@/types/index";


export const addNewGategory = async (newCategory: newCategory) => {
  const result = await pool.query<newCategory>(
    `INSERT INTO consulting 
      (category_name_en, category_name_ar, description_en, description_ar, category_logo, slug)
     VALUES ($1, $2, $3, $4, $5,$6) 
     RETURNING *`,
    [
      newCategory.category_name_en,
      newCategory.category_name_ar,
      newCategory.description_en,
      newCategory.description_ar,
      newCategory.category_logo,
      newCategory.slug
    ]
  );
  return result.rows;
};


export const getAllcategories = async (): Promise<newCategory[]> => {
  const result = await pool.query<newCategory>("SELECT * FROM consulting");
  return result.rows;
};


export const editCategory = async (
  id: string,
  modifiedCategory: newCategory
) => {
  const existing = await pool.query("SELECT * FROM consulting WHERE id=$1", [id]);

  if (existing.rows.length === 0) return null;

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
      modifiedCategory.slug
    ]
  );

  return result.rows;
};


export const deleteCategory = async (id: string) => {
  const existing = await pool.query("SELECT * FROM consulting WHERE id=$1", [id]);

  if (existing.rows.length === 0) return null;

  const result = await pool.query("DELETE FROM consulting WHERE id=$1 RETURNING *", [id]);
  return result.rows;
};


export const getCaregoryByslug  = async (slug: string) => {
  const result = await pool.query<newCategory>(
    "SELECT * FROM consulting WHERE slug=$1", [slug]
  );
  return result.rows;
};

export const getCaregoryById  = async (id: string) => {
  const result = await pool.query<newCategory>(
    "SELECT * FROM consulting WHERE id=$1", [id]
  );
  return result.rows;
};
