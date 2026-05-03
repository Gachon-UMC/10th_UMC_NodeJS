// import { ResultSetHeader, RowDataPacket } from "mysql2";
// import { pool } from "../../../db.config.js";
import { prisma } from "../../../db.config.js";

// store 데이터 삽입
// export const addStore = async (data: any): Promise<number> => {
//   const conn = await pool.getConnection();
//   try {
//     const [result] = await pool.query<ResultSetHeader>(
//       `INSERT INTO store (name, food_category_id, region_id, address, latitude, longitude, created_at)
//        VALUES (?, ?, ?, ?, ?, ?, NOW());`,
//       [data.name, data.foodCategoryId, data.regionId, data.address, data.latitude, data.longitude]
//     );
//     return result.insertId;
//   } catch (err) {
//     throw new Error(`오류가 발생했어요: ${err}`);
//   } finally {
//     conn.release();
//   }
// };
export const addStore = async (data: any) => {
  return await prisma.store.create({
    data: {
      name: data.name,
      food_category_id: data.foodCategoryId,
      region_id: data.regionId,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
      created_at: new Date(),
    },
  });
};

// export const getStore = async (storeId: number): Promise<any | null> => {
//   const conn = await pool.getConnection();

//   try {
//     const [store] = await pool.query<RowDataPacket[]>(
//       `SELECT * FROM store WHERE id = ?;`,
//       [storeId]
//     );

//     if (store.length === 0) {
//       return null;
//     }

//     return store[0];
//   } catch (err) {
//     throw new Error(`오류가 발생했어요: ${err}`);
//   } finally {
//     conn.release();
//   }
// };
export const getStore = async (storeId: number) => {
  return await prisma.store.findFirst({
    where: { id: storeId },
  });
};
// ----------- 6주차 orm 사용해보기 시작 -----------
//store 데이터 조회


// export const getAllStoreReviews = async (
//     storeId: number,
//     cursor: number
//   ) => {
//     const reviews = await prisma.userStoreReview.findMany({
//       select: {
//         id: true,
//         content: true,
//         store: true,
//         user: true,
//       },
//       where: {
//         storeId,
//         id: {
//           gt: cursor,
//         },
//       },
//       orderBy: {
//         id: "asc",
//       },
//       take: 5,
//     });
  
//     return reviews;
//   };

  // ----------- 6주차 orm 사용해보기 끝 -----------