import { MissionAddRequest, bodyToMission, responseFromMission } from "../dto/mission.dto.js";
import { addMission, getMission } from "../repository/mission.repository.js";
import { getStore } from "../../store/repository/store.repository.js";

export const missionAdd = async (storeId: number, data: MissionAddRequest) => {
  try {
    const store = await getStore(storeId);
    if (!store) {
      throw new Error("존재하지 않는 가게입니다.");
    }
    const missionId = await addMission(bodyToMission(storeId, data));
    const mission = await getMission(missionId);
    return responseFromMission({ mission });
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  }
};