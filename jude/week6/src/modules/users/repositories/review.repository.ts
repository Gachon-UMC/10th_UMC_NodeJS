import { prisma } from "../../../db.config.js";

export const getAllStoreReviews = async (storeId: number) => {
  const reviews = await prisma.userStoreReview.findMany({
    select: {
      id: true,
      body: true,
      score: true,
      storeId: true,
      userId: true,
      store: true,
      user: true,
    },
    where: {
      storeId: storeId
    },
    orderBy: {
      id: "asc",
    },
  });

  return reviews;
};

export const getUserReviews = async (userId: number, cursor?: number) => {
    return await prisma.userStoreReview.findMany({
        where: { userId: userId }, //
        take: 10, // 페이지네이션: 한 번에 10개씩
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor } : undefined,
        include: {
            store: true, // user_store_review와 store 모델 연결 (JOIN 효과)
        },
        orderBy: { createdAt: 'desc' } // 최신순 정렬
    });
};

