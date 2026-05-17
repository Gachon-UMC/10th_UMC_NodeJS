export interface CreateReviewRequest {
  content: string;
  starRate: number;
}

export interface CreateReviewResponse {
  reviewId: number;
  createdAt: string;
  updatedAt: string;
}

export const responseFromReview = (
  review: CreateReviewResponse,
): CreateReviewResponse => {
  return {
    reviewId: review.reviewId,
    createdAt: review.createdAt,
    updatedAt: review.updatedAt,
  };
};
