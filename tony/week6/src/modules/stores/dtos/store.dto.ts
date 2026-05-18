export interface AddReviewRequest {
  /** 리뷰 작성 유저 ID */
  userId: number;

  /** 별점 (1~5) */
  rating: number;

  /** 리뷰 내용 */
  content: string;
}

export interface AddMissionRequest {
  /** 미션 제목 */
  title: string;

  /** 미션 설명 */
  description: string;

  /** 미션 성공 시 지급 포인트 */
  rewardPoint: number;

  /** 미션 마감 기한 */
  deadline: string;
}

export const responseFromReviews = (reviews: any[]) => {
  const last = reviews[reviews.length - 1];

  return {
    data: reviews,
    pagination: {
      cursor: last ? last.id : null,
    },
  };
};