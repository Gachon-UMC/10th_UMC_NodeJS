import { type ResultSetHeader, type RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

// 1. User 데이터 삽입
export const addUser = async (data: any): Promise<number | null> => {
  const conn = await pool.getConnection();

  try {
    // [confirm] 뒤에 타입을 명시해 줍니다. (조회 결과는 배열 형태예요)
    const [confirm] = await pool.query<RowDataPacket[]>(
      `SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) as isExistEmail;`,
      [data.email]
    );

    // 이제 confirm[0] 뒤에 점을 찍어도 에러가 나지 않아요!
    if (confirm[0]?.isExistEmail) {
      return null;
    }

    // 삽입 결과는 ResultSetHeader 타입을 사용합니다.
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO user (email, name, gender, birth, address, detail_address, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [
        data.email,
        data.name,
        data.gender,
        data.birth,
        data.address,
        data.detailAddress,
        data.phoneNumber,
      ]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

// 2. 사용자 정보 얻기
export const getUser = async (userId: number): Promise<any | null> => {
  const conn = await pool.getConnection();

  try {
    const [user] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM user WHERE id = ?;`,
      [userId]
    );

    if (user.length === 0) {
      return null;
    }

    return user[0]; // 배열의 첫 번째 요소(유저 정보)를 반환합니다.
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

// 3. 음식 선호 카테고리 매핑
export const setPreference = async (userId: number, foodCategoryId: number): Promise<void> => {
  const conn = await pool.getConnection();

  try {
    await pool.query(
      `INSERT INTO user_favor_category (food_category_id, user_id) VALUES (?, ?);`,
      [foodCategoryId, userId]
    );
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

// 4. 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId: number): Promise<any[]> => {
  const conn = await pool.getConnection();

  try {
    const [preferences] = await pool.query<RowDataPacket[]>(
      "SELECT ufc.id, ufc.food_category_id, ufc.user_id, fcl.name " +
      "FROM user_favor_category ufc JOIN food_category fcl on ufc.food_category_id = fcl.id " +
      "WHERE ufc.user_id = ? ORDER BY ufc.food_category_id ASC;",
      [userId]
    );

    return preferences as any[];
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};


// 가게 생성
export const confirmStore = async (data: any) => {
  const conn = await pool.getConnection();
  try {
    const query = "INSERT INTO store (name, region_id, store_type) VALUES (?, ?, ?);";
    const [result]: any = await conn.query(query, [data.name, data.regionId, data.storeType]);
    conn.release();
    return result.insertId; // 새로 생성된 가게의 ID 반환
  } catch (err) {
    conn.release();
    throw err;
  }
};

// 생성된 가게 정보 조회
export const getStore = async (storeId: number) => {
  const conn = await pool.getConnection();
  try {
    const query = "SELECT id, name FROM store WHERE id = ?;";
    const [rows]: any = await conn.query(query, [storeId]);
    conn.release();
    return rows[0];
  } catch (err) {
    conn.release();
    throw err;
  }
};

// 1. 가게가 존재하는지 확인하는 쿼리
export const existsStore = async (storeId: number) => {
    const [rows]: any = await pool.query("SELECT EXISTS(SELECT 1 FROM store WHERE id = ?) as isExist;", [storeId]);
    return rows[0].isExist === 1;
};

// 2. 리뷰를 DB에 저장하는 쿼리
export const addReview = async (userId: number, storeId: number, data: any) => {
    const [result]: any = await pool.query(
        "INSERT INTO review (user_id, store_id, body, score) VALUES (?, ?, ?, ?);",
        [userId, storeId, data.body, data.score]
    );
    return result.insertId;
};

// 3. 저장된 리뷰의 간단한 정보를 조회하는 쿼리
export const getReviewResponse = async (reviewId: number) => {
    const [rows]: any = await pool.query(
        "SELECT id, body, score FROM review WHERE id = ?;",
        [reviewId]
    );
    return rows[0];
};

// 1. 이미 도전 중인 미션인지 확인 (status가 'CHALLENGING'인 데이터가 있는지)
export const isAlreadyChallenging = async (userId: number, missionId: number) => {
    const query = "SELECT EXISTS(SELECT 1 FROM member_mission WHERE member_id = ? AND mission_id = ? AND status = 'CHALLENGING') as isExist;";
    const [rows]: any = await pool.query(query, [userId, missionId]);
    return rows[0].isExist === 1;
};

// 2. 미션 도전 데이터 삽입
export const addMemberMission = async (userId: number, missionId: number) => {
    const query = "INSERT INTO member_mission (member_id, mission_id, status) VALUES (?, ?, 'CHALLENGING');";
    const [result]: any = await pool.query(query, [userId, missionId]);
    return result.insertId;
};

// 3. 응답용 데이터 조회
export const getMemberMissionResponse = async (id: number) => {
    const query = "SELECT id as memberMissionId, mission_id as missionId, status FROM member_mission WHERE id = ?;";
    const [rows]: any = await pool.query(query, [id]);
    return rows[0];
};