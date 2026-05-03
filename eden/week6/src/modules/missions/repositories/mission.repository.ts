import { prisma } from "../../../db.config.js";

// 미션을 데이터베이스에 추가하는 함수
export const addMission = async (storeId: number, data: any): Promise<number> => {
  try {
    const newMission = await prisma.mission.create({
      data: {
        store_id: storeId,  
        content: data.content,
        point: data.point,
      },
    });

    // BigInt 직렬화 에러를 방지하기 위해 생성된 ID를 Number로 변환하여 반환
    return Number(newMission.id);
  } catch (err) {
    throw new Error(`미션 추가 중 오류 발생: ${err}`);
  }
};

// ID로 가게 정보를 조회하는 함수 
export const getStoreById = async (storeId: number): Promise<any> => {
  try {
    const store = await prisma.store.findUnique({
      where: {
        id: storeId,
      },
      
      include: {
        region: {
          select: {
            name: true, 
          },
        },
      },
    });

    
    if (!store) return null;

   
    return {
      id: Number(store.id),
      name: store.name,
      food_category: store.food_category, 
      region_name: store.region?.name, 
    };
  } catch (err) {
    throw new Error(`가게 조회 중 오류 발생: ${err}`);
  }
};

// 특정 가게의 미션 목록을 조회
export const getMissionsByStoreId = async (storeId: number) => {
    return await prisma.mission.findMany({
        where: {
            store_id: storeId,
        },
        orderBy: {
            created_at: 'desc', // 최신순으로 정렬
        }
    });
}
//유저 아이디로 ㅈ진행중인 미션 목록 조회
export const getUserMissionsByUserId=async(userId:number)=>{
  return await prisma.user_mission.findMany({
    where:{
      user_id:userId,
      status:"challenging",
    },
    include:{
      mission:{
        include:{
          store:true,
        }
      }
    }
  })
}
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
