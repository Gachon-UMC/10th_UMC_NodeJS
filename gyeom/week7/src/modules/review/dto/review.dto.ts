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