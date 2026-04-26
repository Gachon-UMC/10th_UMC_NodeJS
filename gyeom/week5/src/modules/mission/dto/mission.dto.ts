export interface MissionAddRequest {
  content: string;
  rewardPoint: number;
  deadline?: number;
}

export const bodyToMission = (storeId: number, body: MissionAddRequest) => {
  return {
    storeId,
    content: body.content,
    rewardPoint: body.rewardPoint,
    deadline: body.deadline || null,
  };
};

export const responseFromMission = ({ mission }: { mission: any }) => {
  return {
    id: mission.id,
    storeId: mission.store_id,
    content: mission.content,
    rewardPoint: mission.reward_point,
    deadline: mission.deadline,
  };
};