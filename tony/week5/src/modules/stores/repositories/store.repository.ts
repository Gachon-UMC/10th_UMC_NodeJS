import { RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

export const getStoreById = async (storeId: number) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM store WHERE id = ?",
    [storeId]
  );

  return rows;
};

export const addReview = async (
  userId: number,
  storeId: number,
  rating: number,
  content: string
) => {
  const query = `
    INSERT INTO review (user_id, store_id, rating, content)
    VALUES (?, ?, ?, ?)
  `;

  await pool.query(query, [userId, storeId, rating, content]);
};

export const addMission = async (
  storeId: number,
  title: string,
  description: string,
  rewardPoint: number,
  deadline: string
) => {
  const query = `
    INSERT INTO mission (store_id, title, description, reward_point, deadline)
    VALUES (?, ?, ?, ?, ?)
  `;

  await pool.query(query, [storeId, title, description, rewardPoint, deadline]);
};