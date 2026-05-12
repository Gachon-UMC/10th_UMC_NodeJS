import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

export const addReview = async (data: any): Promise<number> => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO review (store_id, user_id, rating, content, created_at)
       VALUES (?, ?, ?, ?, NOW());`,
      [data.storeId, data.userId, data.rating, data.content]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

export const getReview = async (reviewId: number): Promise<any | null> => {
  const conn = await pool.getConnection();
  try {
    const [review] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM review WHERE id = ?;`,
      [reviewId]
    );
    if (review.length === 0) return null;
    return review[0];
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};