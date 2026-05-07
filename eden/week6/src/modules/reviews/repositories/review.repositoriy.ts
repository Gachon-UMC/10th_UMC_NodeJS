import { prisma } from "../../../db.config.js";
import { ReviewItem, StoreResponseDto } from "../dtos/review.dto.js";


//  리뷰를 데이터베이스에 추가하는 함수
export const addReview = async (storeId: number, userId: number, data: any): Promise<number> => {
  try {
    const newReview = await prisma.review.create({
      data: {
        store_id: storeId, 
        user_id: userId,   
        rating: data.rating,
        comment: data.comment,
      },
    });

   
    return Number(newReview.id);
  } catch (err) {
    throw new Error(`리뷰 추가 중 오류 발생: ${err}`);
  }
};

//ID로 가게 정보를 조회하는 함수
export const getStoreById = async (storeId: number): Promise <StoreResponseDto | null> => {
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





// 특정 사용자가 작성한 리뷰 목록을 가게 정보와 함께 조회
export const getReviewsByUserId = async (userId: number) => {
    
    return await prisma.review.findMany({
        where: {
            user_id: userId,
        },
        include: {
            store: true, 
        },
        orderBy: {
            created_at: 'desc', // 최신순으로 정렬
        }
    });
}
export const getAllStoreReviews = async (
    storeId: number,
    cursor: number
  ): Promise<ReviewItem[]> => {
    const reviews = await prisma.review.findMany({
      select: {
        id: true,
        comment: true,
        
        store: {
          select: {
            name: true,
          }
        },
        
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