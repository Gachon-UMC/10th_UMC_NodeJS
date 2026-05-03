import { ReviewAddRequest, bodyToReview, responseFromReview, responseFromReviews } from "../dto/review.dto.js";
import { addReview, getReview, getUserReviews } from "../repository/review.repository.js";
import { getStore } from "../../store/repository/store.repository.js";

export const reviewAdd = async (storeId: number, data: ReviewAddRequest) => {
  try {
    const store = await getStore(storeId);
    if (!store) {
      throw new Error("존재하지 않는 가게입니다.");
    }
    const review = await addReview(bodyToReview(storeId, data));
    const reviewData = await getReview(review.id);
    return responseFromReview({ review: reviewData });
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  }
};

export const reviewList = async (userId: number) => {
  try {
    const reviews = await getUserReviews(BigInt(userId));
    return responseFromReviews({ reviews });
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  }
};
