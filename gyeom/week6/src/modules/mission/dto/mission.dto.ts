export interface MissionAddRequest {
  content: string;
  rewardPoint: number;
  deadline?: number;
}

interface MissionRow {
  id: bigint;
  store_id: bigint;
  content: string;
  reward_point: bigint;
  deadline: bigint | null;
}

export const bodyToMission = (storeId: number, body: MissionAddRequest) => {
  return {
    storeId,
    content: body.content,
    rewardPoint: body.rewardPoint,
    deadline: body.deadline || null,
  };
};

export const responseFromMission = ({ mission }: { mission: MissionRow | null }) => {
  return {
    id: mission?.id,
    storeId: mission?.store_id,
    content: mission?.content,
    rewardPoint: mission?.reward_point,
    deadline: mission?.deadline,
  };
};

export const responseFromMissions = ({ missions }: { missions: MissionRow[] }) => {
  return missions.map((mission) => responseFromMission({ mission }));
};
