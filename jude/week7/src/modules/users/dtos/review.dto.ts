export interface ReviewListResponse {
  reviews: {
    id: number;
    nickname: string;
    score: number;
    content: string;
    createdAt: string;
    reviewImages: string[];
    ownerReply?: {
      content: string;
      createdAt: string;
    };
  }[];
  nextCursor: number | null; 
}


export const responseFromReviews = (reviews: any[], take: number, cursor?: number) => {
    return {
        
        reviewData: reviews.map((review) => ({
            id: review.id,
            content: review.body,
            score: review.score,
            createdAt: review.createdAt?.toISOString().split('T')[0] || "",
            nickname: review.user?.name || "익명",
            reviewImages: review.images || [], 
            ownerReply: review.reply || null,
        })),
        
      
        cursor: reviews.length > 0 ? reviews[reviews.length - 1].id : null, 
        isLastPage: reviews.length < take 
    };
};


export interface ReviewData {
    id: number;
    content: string;
    score: number;
    createdAt: string;
    nickname: string;
    reviewImages: any[];
    ownerReply: string | null;
}


export interface ReviewListResponse {
    reviewData: ReviewData[];
    cursor: number | null;
    isLastPage: boolean;
}



