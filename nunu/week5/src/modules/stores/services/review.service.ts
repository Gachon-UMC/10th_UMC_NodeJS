import { CreateReviewRequest, responseFromReview } from "../dtos/review.dto.js";
import { addReview, getStoreById } from "../repositories/review.repository.js";

export const createReview = async (
  storeId: number,
  data: CreateReviewRequest,
) => {
  const userId = 1; // 첫 번째 유저로 고정 (인증 기능이 없으므로)

  if (!data.content || !data.starRate) {
    const err = new Error("필수값이 누락되었습니다.");
    (err as any).statusCode = 400;
    throw err;
  }

  // 별점 범위 체크 (중요)
  if (data.starRate < 0 || data.starRate > 5) {
    const err = new Error("별점은 0~5 사이여야 합니다.");
    (err as any).statusCode = 400;
    throw err;
  }

  // 가게 존재 확인
  const store = await getStoreById(storeId);

  if (!store) {
    const err = new Error("존재하지 않는 가게입니다.");
    (err as any).statusCode = 404;
    throw err;
  }

  const review = await addReview(userId, storeId, data);

  return responseFromReview({
    reviewId: review.id,
    createdAt: review.created_at,
    updatedAt: review.updated_at,
  });
};
