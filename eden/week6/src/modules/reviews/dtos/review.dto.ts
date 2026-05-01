// 리뷰 추가 요청 본문의 타입을 정의
export interface AddReviewRequestDTO {
  userId: number; // userId를 body에서 받도록 추가
  rating: number;
  comment: string;
}
