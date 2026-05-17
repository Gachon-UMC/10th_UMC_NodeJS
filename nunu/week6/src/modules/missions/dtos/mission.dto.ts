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

export interface GetMissionResponse {
  id: number;
  storeName: string;
  category: string;
  description: string;
  rewardPoint: number;
  expireDate: string;
}

export interface GetMissionsResult {
  missions: GetMissionResponse[];
  totalPages: number;
  hasNext: boolean;
}

export const responseFromMissions = (
  missions: any[],
  hasNext: boolean,
  totalPages: number,
): GetMissionsResult => {
  return {
    missions: missions.map((mission) => ({
      id: Number(mission.id),
      storeName: mission.store.name,
      category: mission.store.storeType,
      description: mission.description,
      rewardPoint: Number(mission.rewardPoint),
      expireDate: mission.expireDate!.toISOString().split("T")[0],
    })),
    hasNext,
    totalPages,
  };
};

export interface CompleteUserMissionResponse {
  missionId: number;
  isCompleted: boolean;
}

export const responseFromCompletedMission = (
  missionId: number,
): CompleteUserMissionResponse => {
  return {
    missionId,
    isCompleted: true,
  };
};
