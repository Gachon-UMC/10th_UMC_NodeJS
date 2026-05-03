
import { prisma } from "../../../db.config.js";
import { ReviewItem } from "../dtos/store.dtos.js";

// 가게를 데이터베이스에 추가하는 함수

export const addStore = async (regionId: number, data: any): Promise<number> => {
  try {
    const newStore = await prisma.store.create({
      data: {
        name: data.name,
        food_category: data.foodCategory, // DB 컬럼명에 맞춰서 매핑
        region_id: regionId,              // 외래키 직접 입력
      },
    });

    // 생성된 가게의 id를 반환합니다.
    return Number(newStore.id);
  } catch (err) {
    // regionId가 존재하지 않는 지역일 경우 Foreign Key 에러가 발생합니다.
    throw new Error(`가게 추가 중 오류 발생: ${err}`);
  }
};

// ID로 가게 정보를 조회하는 함수 (방금 추가한 가게 정보를 반환하기 위해)
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
export const getAllStoreReviews = async (
    storeId: number,
    cursor: number
  ): Promise<ReviewItem[]> => {
    const reviews = await prisma.review.findMany({
      select: {
        id: true,
        comment: true,
        // 1. 가게 정보 JOIN (이름만 쏙!)
        store: {
          select: {
            name: true,
          }
        },
        // 2. 사용자 정보 JOIN (이름만 쏙!)
        user: {
          select: {
            name: true,
          }
        },
      },
      where: {
        store_id: storeId,
        id: {
          gt: cursor,
        },
      },
      orderBy: {
        id: "asc",
      },
      take: 5,
    });
  
    
return reviews as any as ReviewItem[];
  };