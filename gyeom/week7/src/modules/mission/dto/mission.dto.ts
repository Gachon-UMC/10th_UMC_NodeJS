export interface MissionAddRequest {
  content: string;
  rewardPoint: number;
  deadline?: number;
}

export interface MissionAddResponse {
  id: number;
  storeId: number;
  content: string;
  rewardPoint: number;
  deadline: number | null;
}

export interface MissionListResponse {
  missions: MissionAddResponse[];
}

export interface MissionAddApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: MissionAddResponse | null;
}

export interface MissionListApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: MissionListResponse | null;
}


export const toMissionResponse = (mission: any): MissionAddResponse => {
  return {
    id: Number(mission.id),
    storeId: Number(mission.storeId),
    content: mission.content,
    rewardPoint: Number(mission.rewardPoint),
    deadline: mission.deadline ? Number(mission.deadline) : null,
  };
};