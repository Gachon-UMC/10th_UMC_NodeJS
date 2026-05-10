
import { prisma } from "../../../db.config.js";


// 가게를 데이터베이스에 추가하는 함수

export const addStore = async (regionId: number, data: any): Promise<number> => {
  try {
    const newStore = await prisma.store.create({
      data: {
        name: data.name,
        food_category: data.foodCategory, 
        region_id: regionId,              
      },
    });

    
    return Number(newStore.id);
  } catch (err) {
    
    throw new Error(`가게 추가 중 오류 발생: ${err}`);
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
      id: store.id,
      name: store.name,
      food_category: store.food_category,
      region_name: store.region?.name, 
    };
  } catch (err) {
    throw new Error(`가게 조회 중 오류 발생: ${err}`);
  }
};
