export interface ReviewAddRequest {
  userId: number;
  rating: number;
  content?: string;
}

interface ReviewRow {
  id: number;
  store_id: number;
  user_id: number;
  rating: number;
  content: string | null;
}

export const bodyToReview = (storeId: number, body: ReviewAddRequest) => {
  return {
    storeId,
    userId: body.userId,
    rating: body.rating,
    content: body.content || null,
  };
};

export const responseFromReview = ({ review }: { review: ReviewRow }) => {
  return {
    id: review.id,
    storeId: review.store_id,
    userId: review.user_id,
    rating: review.rating,
    content: review.content,
  };
};