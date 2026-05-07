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


export const responseFromReviews = (reviews: any[]) => {
  return {
    reviews: reviews.map((review) => ({
      id: review.id,
      content: review.body,
      score: review.score,
      createdAt: review.createdAt ? review.createdAt.toISOString().split('T')[0] : "",
      nickname: review.user?.name || "익명",
      reviewImages: [], 
      ownerReply: undefined 
    })),
    
    nextCursor: reviews.length > 0 ? reviews[reviews.length - 1].id : null
  };
};

