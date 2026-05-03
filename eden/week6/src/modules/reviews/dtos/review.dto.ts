// 리뷰 추가 요청 본문의 타입을 정의
export interface AddReviewRequestDTO {
  userId: number; 
  rating: number;
  comment: string;
}
export interface StoreResponseDto {
  id: number;
  name: string;
  food_category: string; 
  region_name?: string;  
}


//응답 데이터의 단일 리뷰 항목 타입 정의
interface MyReview {
    id: number;
    rating: number;
    comment: string;
    createdAt: Date;
    store: {
        name: string;
        address: string;
    }
}

// 최종 응답 데이터 타입 정의 (리뷰 배열)
export type ListMyReviewsResponse = MyReview[];


// 레포지토리에서 받은 데이터를 API 응답 형태로 변환하는 함수
export const responseFromMyReviews = (data: any[]): ListMyReviewsResponse => {
    return data.map(review => ({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,
        store: {
            name: review.store.name,
            address: review.store.address,
        }
    }));
}
export const responseFromReviews = (
reviews: ReviewItem[]): ReviewListResponse => {
    const lastReview = reviews[reviews.length - 1];
  
    return {
      data: reviews,
      pagination: {
        cursor: lastReview ? lastReview.id : null,
      },
    };
  };
export interface ReviewItem {
  id: number;
  comment: string;
  store: {
    name: string;
  };
  user: {
    name: string;
  };
}
export interface ReviewListResponse {
  data: ReviewItem[];
  pagination: {
    cursor: number | null; // 다음 페이지를 위한 커서 (마지막 리뷰의 ID)
  };
}
