import { CreateReviewRequest, responseFromReview } from "../dtos/review.dto.js";
import {
  addReview,
  countReviewsByStore,
  getStoreById,
} from "../repositories/review.repository.js";
import { getMyReviewsByStore } from "../repositories/review.repository.js";
import { responseFromReviews } from "../dtos/review.dto.js";

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

export const getMyReviews = async (
  userId: number,
  storeId: number,
  cursor: number,
  limit: number,
) => {
  const store = await getStoreById(storeId);

  if (!store) {
    const err = new Error("존재하지 않는 가게입니다.");
    (err as any).statusCode = 404;
    throw err;
  }

  const { reviews, hasNext } = await getMyReviewsByStore(
    userId,
    storeId,
    cursor,
    limit,
  );

  const totalCount = await countReviewsByStore(userId, storeId);
  const totalPages = Math.ceil(totalCount / limit);

  return responseFromReviews(reviews, hasNext, totalPages);
};
