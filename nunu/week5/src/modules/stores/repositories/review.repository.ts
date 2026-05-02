import { RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";
import { CreateReviewRequest } from "../dtos/review.dto.js";

export const addReview = async (
  userId: number,
  storeId: number,
  data: CreateReviewRequest,
) => {
  const conn = await pool.getConnection();

  try {
    const [result]: any = await conn.query(
      `INSERT INTO review (user_id, store_id, content, star_rate)
       VALUES (?, ?, ?, ?)`,
      [userId, storeId, data.content, data.starRate],
    );

    const reviewId = result.insertId;

    // 생성된 데이터 조회
    const [rows]: any = await conn.query(
      `SELECT id, created_at, updated_at FROM review WHERE id = ?`,
      [reviewId],
    );

    return rows[0];
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

// 가게 존재 확인
export const getStoreById = async (
  storeId: number,
): Promise<RowDataPacket | null> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM store WHERE id = ?`,
      [storeId],
    );

    return rows[0] || null;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  }
};
