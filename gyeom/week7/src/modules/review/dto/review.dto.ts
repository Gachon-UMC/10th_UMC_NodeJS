export interface ReviewAddRequest {
  userId: number;
  rating: number;
  content?: string;
}

export interface ReviewAddResponse {
  id: number;
  storeId: number;
  userId: number;
  rating: number;
  content: string | null;
}

export interface ReviewListResponse {
  reviews: ReviewAddResponse[];
}

export interface ReviewAddApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ReviewAddResponse | null;
}

export interface ReviewListApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ReviewListResponse | null;
}


export const toReviewResponse = (review: any): ReviewAddResponse => {
  return {
    id: Number(review?.id),
    storeId: Number(review?.storeId),
    userId: Number(review?.userId),
    rating: Number(review?.rating),
    content: review?.content ?? null,
  };
};