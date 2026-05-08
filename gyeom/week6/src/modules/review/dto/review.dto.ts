import { Prisma } from "../../../generated/prisma/client.js";

export interface ReviewAddRequest {
  userId: number;
  rating: number;
  content?: string;
}

interface ReviewRow {
  id: bigint;
  storeId: bigint;
  userId: bigint;
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
    storeId: review?.storeId,
    userId: review?.userId,
    rating: review?.rating,
    content: review?.content,
  };
};

export const responseFromReviews = ({ reviews }: { reviews: ReviewRow[] }) => {
  return reviews.map((review) => responseFromReview({ review }));
};