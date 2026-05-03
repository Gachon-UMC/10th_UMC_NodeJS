// import { ResultSetHeader, RowDataPacket } from "mysql2";
// import { pool } from "../../../db.config.js";
import { prisma } from "../../../db.config.js";

export const addMission = async (data: any) => {
  return await prisma.mission.create({
    data: {
      store_id: data.storeId,
      content: data.content,
      reward_point: data.rewardPoint,
      deadline: data.deadline,
      created_at: new Date(),
    },
  });
};

// export const addMission = async (data: any): Promise<number> => {
//   const conn = await pool.getConnection();
//   try {
//     const [result] = await pool.query<ResultSetHeader>(
//       `INSERT INTO mission (store_id, content, reward_point, deadline, created_at)
//        VALUES (?, ?, ?, ?, NOW());`,
//       [data.storeId, data.content, data.rewardPoint, data.deadline]
//     );
//     return result.insertId;
//   } catch (err) {
//     throw new Error(`오류가 발생했어요: ${err}`);
//   } finally {
//     conn.release();
//   }
// };

export const getMission = async (missionId: number) => {
  return await prisma.mission.findFirst({
    where: { id: missionId },
  });
};

// export const getMission = async (missionId: number): Promise<any | null> => {
//   const conn = await pool.getConnection();
//   try {
//     const [mission] = await pool.query<RowDataPacket[]>(
//       `SELECT * FROM mission WHERE id = ?;`,
//       [missionId]
//     );
//     if (mission.length === 0) return null;
//     return mission[0];
//   } catch (err) {
//     throw new Error(`오류가 발생했어요: ${err}`);
//   } finally {
//     conn.release();
//   }
// };

// 6주차 미션
export const getStoreMissions = async (storeId: bigint) => {
  return await prisma.mission.findMany({
    where: { store_id: storeId },
    orderBy: { created_at: "desc" },
  });
};
