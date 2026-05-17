export interface CreateStoreRequest {
  name: string;
  storeType: string;
  regionId: number;
}

export interface CreateStoreResponse {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export const responseFromStore = (
  store: CreateStoreResponse,
): CreateStoreResponse => {
  return {
    id: store.id,
    name: store.name,
    createdAt: store.createdAt,
    updatedAt: store.updatedAt,
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
