import { Prisma } from "../../../generated/prisma/client.js"



export interface ReviewAddRequest {
  userId: number;
  rating: number;
  content?: string;
}
interface ReviewRow {
  id: bigint;
  store_id: bigint;
  user_id: bigint;
  rating: Prisma.Decimal;
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

export const responseFromReview = ({ review }: { review: ReviewRow | null }) => {
  return {
    id: review?.id,
    storeId: review?.store_id,
    userId: review?.user_id,
    rating: review?.rating,
    content: review?.content,
  };
};

export const responseFromReviews = ({ reviews }: { reviews: ReviewRow[] }) => {
  return reviews.map((review) => responseFromReview({ review }));
};
