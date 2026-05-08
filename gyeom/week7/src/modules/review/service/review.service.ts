import { ReviewAddRequest, ReviewAddResponse, ReviewListResponse } from "../dto/review.dto.js";
import { addReview, getReview, getUserReviews } from "../repository/review.repository.js";
import { getStore } from "../../store/repository/store.repository.js";
import { getUser } from "../../users/repositories/user.repository.js";
import { AppError } from "../../../common/errors/app.error.js";
import { StatusCodes } from "http-status-codes";
export const reviewAdd = async (
  storeId: number,
  data: ReviewAddRequest
): Promise<ReviewAddResponse> => {

  const store = await getStore(storeId);

  if (!store) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "존재하지 않는 가게입니다."
    );
  }

  const user = await getUser(data.userId);

  if (!user) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "존재하지 않는 사용자입니다."
    );
  }

  const review = await addReview({
    storeId,
    userId: data.userId,
    rating: data.rating,
    content: data.content || null,
  });

  const reviewData = await getReview(review.id);

  return {
    id: Number(reviewData?.id),
    storeId: Number(reviewData?.storeId),
    userId: Number(reviewData?.userId),
    rating: Number(reviewData?.rating),
    content: reviewData?.content ?? null,
  };
};


export const reviewList = async (
  userId: number
): Promise<ReviewListResponse> => {

  const user = await getUser(userId);

  if (!user) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "존재하지 않는 사용자입니다."
    );
  }

  const reviews = await getUserReviews(BigInt(userId));

  return {
    reviews: reviews.map((review) => ({
      id: Number(review.id),
      storeId: Number(review.storeId),
      userId: Number(review.userId),
      rating: Number(review.rating),
      content: review.content ?? null,
    })),
  };
};