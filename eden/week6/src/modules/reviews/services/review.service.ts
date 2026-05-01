import {addReview} from "../repositories/review.repositoriy.js";
import { AddReviewRequestDTO } from "../dtos/review.dto.js";
import { getStoreById } from "../repositories/review.repositoriy.js";



// createReview 함수의 파라미터를 DTO 객체로 받도록 수정
export const createReview = async (storeId: number, reviewData: AddReviewRequestDTO) => {
  // 가게가 실제로 존재하는지 확인
  const store = await getStoreById(storeId);
  if (!store) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  // 가게가 존재하면 리뷰를 추가 (DTO에서 userId 추출)
  const newReviewId = await addReview(storeId, reviewData.userId, {
    rating: reviewData.rating,
    comment: reviewData.comment,
  });

  // 공적으로 추가된 리뷰의 ID를 반환
  return { newReviewId };
};