import { RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

export const addUserMission = async (userId: number, missionId: number) => {
  const conn = await pool.getConnection();
  const status = 0; // 0: 진행중, 1: 완료

  try {
    const [result]: any = await conn.query(
      `INSERT INTO user_mission (user_id, mission_id, status)
       VALUES (?, ?, ?)`,
      [userId, missionId, status],
    );

    const userMissionId = result.insertId;

    // 생성된 데이터 조회
    const [rows]: any = await conn.query(
      `SELECT id, created_at, updated_at FROM user_mission WHERE id = ?`,
      [userMissionId],
    );

    return rows[0];
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

// 미션 존재 확인
export const getMissionById = async (
  missionId: number,
): Promise<RowDataPacket | null> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM mission WHERE id = ?`,
      [missionId],
    );

    return rows[0] || null;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  }
};

// 이미 도전 중인 미션인지 확인
export const getUserMissionByMissionId = async (
  userId: number,
  missionId: number,
): Promise<RowDataPacket | null> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT * FROM user_mission WHERE user_id = ? AND mission_id = ?`,
    [userId, missionId],
  );

  return rows[0] || null;
};
