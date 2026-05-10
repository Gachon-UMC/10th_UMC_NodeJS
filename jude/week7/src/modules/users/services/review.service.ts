import { prisma } from "../../../db.config.js";
import {  responseFromReviews } from "../dtos/review.dto.js";
import {

  getAllStoreReviews, getUserReviews

} from "../repositories/review.repository.js";

export const listStoreReviews = async (storeId: number, take: number, cursor?: number) => {
    // 1. [피드백 반영] 가게 존재 여부 확인
    const store = await prisma.store.findUnique({
        where: { id: storeId }
    });

    // 가게가 없으면 에러를 던집니다.
    if (!store) {
        throw new Error("존재하지 않는 가게입니다.");
    }

    // 2. 가게가 존재한다면 리뷰 목록 조회 실행
    const reviews = await getAllStoreReviews(storeId, take, cursor);
    
    
    return {
        reviewData: reviews.map((review) => ({
            id: review.id,
            content: review.body,
            score: review.score,
            
            createdAt: review.createdAt.toISOString().split('T')[0], 
            
            
            nickname: review.user?.name ?? "익명",
            
            
            reviewImages: review.images ?? [],
            ownerReply: review.reply ?? null,
        })),

        // 페이징 정보 (가장 안전한 방식)
        cursor: reviews.at(-1)?.id ?? null,
        isLastPage: reviews.length < take
    };
};
export const listUserReviews = async (userId: number, take: number, cursor?: number) => {
    // 1. [존재 여부 확인] 유저가 실제로 존재하는지 확인
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    // 유저가 없으면 에러를 던집니다.
    if (!user) {
        throw new Error("존재하지 않는 사용자입니다.");
    }

    // 2. [조회] 유저가 존재한다면 레포지토리를 호출하여 리뷰 데이터를 가져옵니다.
    const reviews = await getUserReviews(userId, take, cursor);
    
    return {
        reviewData: reviews.map((review) => ({
            id: review.id,
            content: review.body,
            score: review.score,
            
            createdAt: review.createdAt.toISOString().split('T')[0], 
            
            
            nickname: review.user?.name ?? "익명",
            
           
            reviewImages: review.images ?? [],
            ownerReply: review.reply ?? null,
        })),

        // 페이징 정보 (가장 안전한 방식)
        cursor: reviews.at(-1)?.id ?? null,
        isLastPage: reviews.length < take
    };
};
    
    