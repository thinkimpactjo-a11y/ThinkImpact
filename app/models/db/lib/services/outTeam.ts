import pool from "../index";
import { newMember,memeberOrder } from "@/types";

export const addNewMember = async (newMember: newMember) => {
  const displayOrder = await pool.query(
    "select COALESCE(MAX(display_order), 0) + 1 AS next_order from our_team"  // used to get the highest display_order
  );
  const next_order = displayOrder.rows[0].next_order;

  const result = await pool.query<newMember>(
    "insert into our_team (name_en, name_ar, description_en, description_ar, position_en, position_ar, image, display_order,main) values ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning *",
    [
      newMember.name_en,
      newMember.name_ar,
      newMember.description_en,
      newMember.description_ar,
      newMember.position_en,
      newMember.position_ar,
      newMember.image,
      next_order,
      newMember.main
    ]
  );

  return result.rows;
};

export const getAllMembers = async () => {
  const result = await pool.query(
    "select * from our_team ORDER BY display_order ASC"
  );
  return result.rows;
};

export const editMember = async (id: string, modifiedMember: newMember) => {
  const isValidId = await pool.query("select * from our_team where id=$1 ", [
    id,
  ]);
  if (isValidId.rows.length === 0) {
    return null;
  } else {
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
        modifiedMember.main
      ]
    );
    return result.rows;
  }
};

export const deleteMember = async (id: string) => {
  const isValidId = await pool.query("select * from our_team where id=$1 ", [
    id,
  ]);
  if (isValidId.rows.length === 0) {
    return null;
  } else {
    const result = await pool.query("delete from our_team where id=$1", [id]);
    return result.rows;
  }
};



export const updateMemberOrder= async (clients:memeberOrder[])=>{

  await pool.query("UPDATE our_team SET display_order = NULL");

  const queries= clients.map((query)=>{
    pool.query("update our_team set display_order=$1 where id=$2",
    [query.display_order,query.id])
  })

  await Promise.all(queries)

}


export const getMemberById= async (id:string) =>{
  const result= await pool.query<newMember>("select * from our_team where id=$1 ",[id])
  return result.rows
}