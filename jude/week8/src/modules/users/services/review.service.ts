import { prisma } from "../../../db.config.js";
import { getAllStoreReviews, getUserReviews } from "../repositories/review.repository.js";
import { success } from "../../../common/responses/response.js";
import { StoreNotFoundError, UserNotFoundError } from "../../../common/errors/custom.error.js"; 

export const listStoreReviews = async (storeId: number, take: number, cursor?: number) => {
    // 1. 가게 존재 여부 확인
    const store = await prisma.store.findUnique({
        where: { id: storeId }
    });

    if (!store) {
        throw new StoreNotFoundError("존재하지 않는 가게입니다.",{ storeId });
    }

    // 2. 리뷰 목록 조회
    const reviews = await getAllStoreReviews(storeId, take, cursor);
    
    const result = {
        reviewData: reviews.map((review) => ({
            id: review.id,
            content: review.body,
            score: review.score,
            createdAt: review.createdAt.toISOString().split('T')[0]?? "", 
            nickname: review.user?.name ?? "익명",
            reviewImages: review.images ?? [],
            ownerReply: review.reply ?? null,
        })),
        cursor: reviews.at(-1)?.id ?? null,
        isLastPage: reviews.length < take
    };

    return success(result);
};

export const listUserReviews = async (userId: number, take: number, cursor?: number) => {
    // 1. 유저 존재 여부 확인
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) {
        throw new UserNotFoundError("존재하지 않는 사용자입니다.",{ userId });
    }

    // 2. 리뷰 데이터 조회
    const reviews = await getUserReviews(userId, take, cursor);
    
    const result = {
        reviewData: reviews.map((review) => ({
            id: review.id,
            content: review.body,
            score: review.score,
            createdAt: review.createdAt.toISOString().split('T')[0]?? "", 
            nickname: review.user?.name ?? "익명",
            reviewImages: review.images ?? [],
            ownerReply: review.reply ?? null,
        })),
        cursor: reviews.at(-1)?.id ?? null,
        isLastPage: reviews.length < take
    };

    return success(result);
};
    
    