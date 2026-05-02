import { pool } from "../../../db.config.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { CreateStoreRequest } from "../dtos/store.dto.js";

// 가게 생성
export const addStore = async (data: CreateStoreRequest) => {
  const conn = await pool.getConnection();

  try {
    const [result] = await conn.query<ResultSetHeader>(
      `INSERT INTO store (name, store_type, region_id)
       VALUES (?, ?, ?)`,
      [data.name, data.storeType, data.regionId],
    );

    const storeId = result.insertId;

    // 생성된 데이터 조회
    const [rows]: any = await conn.query(
      `SELECT id, created_at, updated_at FROM store WHERE id = ?`,
      [storeId],
    );

    return rows[0];
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

// 지역 존재 확인
export const getRegionById = async (
  regionId: number,
): Promise<RowDataPacket | null> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM region WHERE id = ?`,
      [regionId],
    );

    return rows[0] || null;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  }
};
