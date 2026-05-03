export interface AddReviewRequest {
  userId: number;
  rating: number;
  content: string;
}

export interface AddMissionRequest {
  title: string;
  description: string;
  rewardPoint: number;
  deadline: string;
}