export interface UserMissionAddRequest {
  missionId: number;
}

export interface UserMissionAddResponse {
  id: number;
  userId: number;
  missionId: number;
  status: string;
}

export interface UserMissionListResponse {
  userMissions: UserMissionAddResponse[];
}

export interface UserMissionCompleteResponse {
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