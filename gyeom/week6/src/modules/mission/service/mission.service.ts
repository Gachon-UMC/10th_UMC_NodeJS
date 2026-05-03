import { MissionAddRequest, bodyToMission, responseFromMission, responseFromMissions } from "../dto/mission.dto.js";
import { addMission, getMission, getStoreMissions } from "../repository/mission.repository.js";
import { getStore } from "../../store/repository/store.repository.js";

export const missionAdd = async (storeId: number, data: MissionAddRequest) => {
  const store = await getStore(storeId);
  if (!store) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  const mission = await addMission(bodyToMission(storeId, data));
  const missionData = await getMission(Number(mission.id));
  return responseFromMission({ mission: missionData });
};

export const missionList = async (storeId: number) => {
  const missions = await getStoreMissions(BigInt(storeId));
  return responseFromMissions({ missions });
};