import {addReview, getReviewsByUserId} from "../repositories/review.repositoriy.js";
import { AddReviewRequestDTO, responseFromMyReviews } from "../dtos/review.dto.js";
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

// 내가 작성한 리뷰 목록 조회 서비스
export const listMyReviews = async (userId: number) => {
    //레포지토리를 호출하여 데이터베이스에서 리뷰 목록을 가져옵니다.
    const reviews = await getReviewsByUserId(userId);

    //가져온 데이터를 DTO를 사용해 API 응답 형식으로 변환합니다.
    return responseFromMyReviews(reviews);
}
