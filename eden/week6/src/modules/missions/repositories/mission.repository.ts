import { pool } from "../../../db.config.js"; 
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { prisma } from "../../../db.config.js";

// 미션을 데이터베이스에 추가하는 함수
export const addMission = async (storeId: number, data: any): Promise<number> => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO mission (store_id, content, point) VALUES (?, ?, ?);",
      [storeId, data.content, data.point]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`미션 추가 중 오류 발생: ${err}`);
  } finally {
    conn.release();
  }
};
export const getStoreById = async (storeId: number): Promise<any> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT s.id, s.name, s.food_category, r.name as region_name 
       FROM store s
       JOIN region r ON s.region_id = r.id
       WHERE s.id = ?;`,
      [storeId]
    );
    return rows[0];
  } catch (err) {
    throw new Error(`가게 조회 중 오류 발생: ${err}`);
  } finally {
    conn.release();
  }
};

