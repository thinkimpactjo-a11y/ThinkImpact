import pool from "../index";

import { newTraining } from "@/types/index";

export const addNewTraining = async (newTraining: newTraining) => {
 
  const maxOrderResult = await pool.query<{ max_sort: number }>(
    `SELECT COALESCE(MAX(sort_order), 0) AS max_sort FROM training`
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
    ]
  );

  return result.rows;
};


export const getAllTraining = async () => {
  const result = await pool.query<newTraining>("select * from training ORDER BY sort_order ASC");
  return result.rows;
};

export const editTraining = async (
  id: string,
  modifiedTraining: newTraining
) => {
  const isValidId = await pool.query("select * from training where id=$1 ", [
    id,
  ]);
  if (isValidId.rows.length === 0) {
    return null;
  } else {
    const result = await pool.query<newTraining>(
      " update training set name_en= coalesce ($2,name_en ), name_ar = coalesce ($3,name_ar ) ,description_en = coalesce ($4,description_en) ,description_ar = coalesce($5,description_ar),slug = coalesce($6,slug) where id= $1 returning * ",
      [
        id,
        modifiedTraining.name_en,
        modifiedTraining.name_ar,
        modifiedTraining.description_en,
        modifiedTraining.description_ar,
        modifiedTraining.slug
      ]
    );
    return result.rows;
  }
};

export const deleteTraining = async (id: string) => {
  const isValidId = await pool.query("select * from training where id=$1 ", [
    id,
  ]);
  if (isValidId.rows.length === 0) {
    return null;
  } else {
    const result = await pool.query("delete from training where id=$1", [id]);
    return result.rows;
  }
};



export const getTrainingById  = async (id: string) => {
  const result = await pool.query<newTraining>(
    "SELECT * FROM training  WHERE id=$1", [id]
  );
  return result.rows;
};


export const getTrainingBySlug  = async (slug: string) => {
  const result = await pool.query<newTraining>(
    "SELECT * FROM training  WHERE slug=$1", [slug]
  );
  return result.rows;
};