import { Prisma } from "../../../generated/prisma/client.js";

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

// Prisma 타입 유틸
type ReviewWithUserName = Prisma.ReviewGetPayload<{
  select: {
    id: true;
    content: true;
    starRate: true;
    createdAt: true;
    user: {
      select: {
        name: true;
      };
    };
  };
}>;

export interface GetReviewResponse {
  id: number;
  content: string;
  starRate: number;
  userName: string;
  createdAt: string;
}

export const responseFromReviewList = (
  reviews: ReviewWithUserName[],
): GetReviewResponse[] => {
  return reviews.map((review) => ({
    id: Number(review.id),
    content: review.content,
    starRate: Number(review.starRate),
    userName: review.user.name,
    createdAt: review.createdAt.toISOString(),
  }));
};
