import { MissionAddRequest, MissionAddResponse, MissionListResponse, toMissionResponse } from "../dto/mission.dto.js";
import { addMission, getMission, getStoreMissions } from "../repository/mission.repository.js";
import { getStore } from "../../store/repository/store.repository.js";
import { StoreNotFoundError } from "../../../common/errors/error.js";

export const missionAdd = async (
  storeId: number,
  data: MissionAddRequest
): Promise<MissionAddResponse> => {
  const store = await getStore(storeId);
  if (!store) {
    throw new StoreNotFoundError();
  }

  const mission = await addMission({
    storeId,
    content: data.content,
    rewardPoint: data.rewardPoint,
    deadline: data.deadline || null,
  });

  const missionData = await getMission(Number(mission.id));
  return toMissionResponse(missionData);
};

export const storeMissionList = async (
  storeId: number,
  cursor?: number
): Promise<MissionListResponse> => {
  const store = await getStore(storeId);
  if (!store) {
    throw new StoreNotFoundError();
  }

  const missions = await getStoreMissions(BigInt(storeId), cursor);
  return {
    missions: missions.map(toMissionResponse),
  };
};