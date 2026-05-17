import { ReviewAddRequest, ReviewAddResponse, ReviewListResponse, toReviewResponse } from "../dto/review.dto.js";
import { addReview, getReview, getUserReviews } from "../repository/review.repository.js";
import { getStore } from "../../store/repository/store.repository.js";
import { getUser } from "../../users/repositories/user.repository.js";
import { StoreNotFoundError, UserNotFoundError } from "../../../common/errors/error.js";

export const reviewAdd = async (
  storeId: number,
  data: ReviewAddRequest
): Promise<ReviewAddResponse> => {
  const store = await getStore(storeId);
  if (!store) {
    throw new StoreNotFoundError();
  }

  const user = await getUser(data.userId);
  if (!user) {
    throw new UserNotFoundError();
  }

  const review = await addReview({
    storeId,
    userId: data.userId,
    rating: data.rating,
    content: data.content || null,
  });

  const reviewData = await getReview(review.id);
  return toReviewResponse(reviewData);
};

export const reviewList = async (
  userId: number
): Promise<ReviewListResponse> => {
  const user = await getUser(userId);
  if (!user) {
    throw new UserNotFoundError();
  }

  const reviews = await getUserReviews(BigInt(userId));
  return {
    reviews: reviews.map(toReviewResponse),
  };
};