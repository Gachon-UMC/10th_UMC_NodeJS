// import { ResultSetHeader, RowDataPacket } from "mysql2";
// import { pool } from "../../../db.config.js";
import { prisma } from "../../../db.config.js";

export const addReview = async (data: any) => {
  return await prisma.review.create({
    data: {
      store_id: data.storeId,
      user_id: data.userId,
      rating: data.rating,
      content: data.content,
      created_at: new Date(),
    },
  });
};
// export const addReview = async (data: any): Promise<number> => {
//   const conn = await pool.getConnection();
//   try {
//     const [result] = await pool.query<ResultSetHeader>(
//       `INSERT INTO review (store_id, user_id, rating, content, created_at)
//        VALUES (?, ?, ?, ?, NOW());`,
//       [data.storeId, data.userId, data.rating, data.content]
//     );
//     return result.insertId;
//   } catch (err) {
//     throw new Error(`오류가 발생했어요: ${err}`);
//   } finally {
//     conn.release();
//   }
// };

export const getReview = async (reviewId: bigint) => {
  return await prisma.review.findFirst({
    where: { id: reviewId },
  });
};
// export const getReview = async (reviewId: number): Promise<any | null> => {
//   const conn = await pool.getConnection();
//   try {
//     const [review] = await pool.query<RowDataPacket[]>(
//       `SELECT * FROM review WHERE id = ?;`,
//       [reviewId]
//     );
//     if (review.length === 0) return null;
//     return review[0];
//   } catch (err) {
//     throw new Error(`오류가 발생했어요: ${err}`);
//   } finally {
//     conn.release();
//   }
// };

// 6주차 1번
export const getUserReviews = async (userId: bigint) => {
  return await prisma.review.findMany({
    where: { user_id: userId },
    orderBy: { created_at: "desc" },
  });
};