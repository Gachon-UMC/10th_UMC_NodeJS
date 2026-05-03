export interface ReviewAddRequest {
  userId: number;
  rating: number;
  content?: string;
}

export const bodyToReview = (storeId: number, body: ReviewAddRequest) => {
  return {
    storeId,
    userId: body.userId,
    rating: body.rating,
    content: body.content || null,
  };
};

export const responseFromReview = ({ review }: { review: any }) => {
  return {
    id: review.id,
    storeId: review.store_id,
    userId: review.user_id,
    rating: review.rating,
    content: review.content,
  };
};

export const responseFromReviews = ({ reviews }: { reviews: any[] }) => {
  return reviews.map((review) => responseFromReview({ review }));
};