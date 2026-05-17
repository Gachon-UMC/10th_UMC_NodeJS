export interface UserMissionResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export const responseFromUserMission = (
  mission: UserMissionResponse,
): UserMissionResponse => {
  return {
    id: mission.id,
    createdAt: mission.createdAt,
    updatedAt: mission.updatedAt,
  };
};
