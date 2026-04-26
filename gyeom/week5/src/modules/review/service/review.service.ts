import { ReviewAddRequest, bodyToReview, responseFromReview } from "../dto/review.dto.js";
import { addReview, getReview } from "../repository/review.repository.js";
import { getStore } from "../../store/repository/store.repository.js";

export const reviewAdd = async (storeId: number, data: ReviewAddRequest) => {
  const store = await getStore(storeId);
  if (!store) {
    throw new Error("존재하지 않는 가게입니다.");
  }
  const reviewId = await addReview(bodyToReview(storeId, data));
  const review = await getReview(reviewId);
  return responseFromReview({ review });
};