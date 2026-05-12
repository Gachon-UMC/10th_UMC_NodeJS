import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

export const addMission = async (data: any): Promise<number> => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO mission (store_id, content, reward_point, deadline, created_at)
       VALUES (?, ?, ?, ?, NOW());`,
      [data.storeId, data.content, data.rewardPoint, data.deadline]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

export const getMission = async (missionId: number): Promise<any | null> => {
  const conn = await pool.getConnection();
  try {
    const [mission] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM mission WHERE id = ?;`,
      [missionId]
    );
    if (mission.length === 0) return null;
    return mission[0];
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};