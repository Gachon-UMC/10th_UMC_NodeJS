export interface UserMissionAddRequest {
  /** 도전할 미션 ID */
  missionId: number;
}

export interface UserMissionAddResponse {
  /** 유저 미션 ID */
  id: number;
  /** 유저 ID */
  userId: number;
  /** 미션 ID */
  missionId: number;
  /** 미션 상태 (CHALLENGING / DONE) */
  status: string;
}

export interface UserMissionListResponse {
  /** 유저 미션 목록 */
  userMissions: UserMissionAddResponse[];
}

export interface UserMissionCompleteResponse {
  /** 업데이트된 미션 수 */
  count: number;
}

export interface UserMissionAddApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: UserMissionAddResponse | null;
}

export interface UserMissionListApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: UserMissionListResponse | null;
}

export interface UserMissionCompleteApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: UserMissionCompleteResponse | null;
}

export const toUserMissionResponse = (userMission: any): UserMissionAddResponse => {
  return {
    id: Number(userMission.id),
    userId: Number(userMission.userId),
    missionId: Number(userMission.missionId),
    status: userMission.status,
  };
};