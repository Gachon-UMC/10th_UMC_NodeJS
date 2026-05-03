
import { prisma } from "../../../db.config.js";
import { UserPreferenceItemDto } from "../dtos/user.dtos.js";
// User 데이터 삽입 (이메일 중복 체크 포함)
export const addUser = async (data: any): Promise<number | null> => {
  try {
    // 이메일 중복 여부를 먼저 확인합니다.
    const existingUser = await prisma.user.findFirst({
      where: { email: data.email },
    });

    if (existingUser) {
      return null; // 이미 존재하는 이메일이면 null 반환
    }

    // 데이터를 삽입합니다.
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password,
        gender: data.gender,
        birth: data.birth,
        address: data.address,
        detailAddress: data.detailAddress,
        phoneNumber: data.phoneNumber,
      },
    });

    return Number(newUser.id); // BigInt일 경우를 대비해 Number로 변환
  } catch (err) {
    throw new Error(`회원가입 중 오류 발생: ${err}`);
  }
};

// 사용자 정보 얻기 (이미 Prisma를 사용 중이시네요!)
export const getUser = async (userId: number) => {
  // findFirstOrThrow는 데이터를 찾지 못하면 바로 에러를 던져서 편리합니다.
  return await prisma.user.findFirstOrThrow({ 
    where: { id: userId } 
  });
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId: number, foodCategoryId: number) => {
  await prisma.userFavorCategory.create({
    data: {
      userId: userId,
      foodCategoryId: foodCategoryId,
    },
  });
};

// 4. 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (
  userId: number
): Promise<UserPreferenceItemDto[]> => { // any[] 대신 DTO 사용
  try {
    const preferences = await prisma.userFavorCategory.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        foodCategoryId: 'asc',
      },
      select: {
        id: true,
        foodCategoryId: true,
        userId: true,
      },
    });

    return preferences.map((pref) => ({
      ...pref,
      userId: typeof pref.userId === 'bigint' ? Number(pref.userId) : pref.userId,
    })); 
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  }
};


// 사용자가 특정 미션에 이미 도전 중인지 확인하는 함수
export const isMissionChallenged = async (userId: number, missionId: number): Promise<boolean> => {
  try {
  
    const count = await prisma.user_mission.count({
      where: {
        user_id: userId,
        mission_id: missionId,
        status: 'challenging',
      },
    });

  
    return count > 0;
  } catch (err) {
    throw new Error(`미션 도전 여부 확인 중 오류 발생: ${err}`);
  }
};

// 사용자의 미션 도전을 데이터베이스에 추가하는 함수

export const challengeMission = async (userId: number, missionId: number): Promise<number> => {
  try {
    const newUserMission = await prisma.user_mission.create({
      data: {
        user_id: userId,
        mission_id: missionId,
        status: 'challenging', 
      },
    });

   
    return Number(newUserMission.id);
  } catch (err) {
   
    throw new Error(`미션 도전 추가 중 오류 발생: ${err}`);
  }
};
export const getMission = async (missionId: number): Promise<any | null> => {
  try {
   
    const mission = await prisma.mission.findFirst({
      where: {
        id: missionId,
      },
    });

   
    return mission;
  } catch (err) {
  
    throw new Error(`미션 조회 중 오류 발생: ${err}`);
  }
};

