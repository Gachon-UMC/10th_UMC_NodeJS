
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

// 2. ID로 가게 정보를 조회하는 함수 
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