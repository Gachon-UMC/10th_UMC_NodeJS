import { ReviewListResponse, responseFromReviews } from "../dtos/review.dto.js";
import {

  getAllStoreReviews, getUserReviews

} from "../repositories/review.repository.js";

export const listStoreReviews = async (
  storeId: number
): Promise<ReviewListResponse> => {
  const reviews = await getAllStoreReviews(storeId);
  return responseFromReviews(reviews);
};

export const listUserReviews = async (userId: number, cursor?: number) => {
    // 레포지토리를 호출하여 데이터를 가져옵니다.
    const reviews = await getUserReviews(userId, cursor);
    return reviews;
    };
