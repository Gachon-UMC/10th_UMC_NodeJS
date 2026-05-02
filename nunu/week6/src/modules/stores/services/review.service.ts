import { CreateReviewRequest, responseFromReview } from "../dtos/review.dto.js";
import { addReview, getStoreById } from "../repositories/review.repository.js";

export const createReview = async (
  userId: number,
  storeId: number,
  data: CreateReviewRequest,
) => {
  // 가게 존재 확인
  const store = await getStoreById(storeId);

  if (!store) {
    const err = new Error("존재하지 않는 가게입니다.");
    (err as any).statusCode = 404;
    throw err;
  }

  const review = await addReview(userId, storeId, data);

  return responseFromReview({
    reviewId: Number(review.id),
    createdAt: review.createdAt.toISOString(),
    updatedAt: review.updatedAt.toISOString(),
  });
};
