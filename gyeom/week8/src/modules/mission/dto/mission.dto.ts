export interface MissionAddRequest {
  /** 미션 내용 */
  content: string;
  /** 미션 달성 시 지급되는 포인트 */
  rewardPoint: number;
  /** 미션 마감 기한 (선택) */
  deadline?: number;
}

export interface MissionAddResponse {
  /** 미션 ID */
  id: number;
  /** 가게 ID */
  storeId: number;
  /** 미션 내용 */
  content: string;
  /** 리워드 포인트 */
  rewardPoint: number;
  /** 마감 기한 */
  deadline: number | null;
}

export interface MissionListResponse {
  /** 미션 목록 */
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