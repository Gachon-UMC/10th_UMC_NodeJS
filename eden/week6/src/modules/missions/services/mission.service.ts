import { AddMissionRequestDTO, responseFromMission } from "../dtos/mission.dto";
import { addMission, getStoreById } from "../repositories/mission.repository";

export const createMission = async (storeId: number, missionData: AddMissionRequestDTO) => {
  // 1. 가게가 실제로 존재하는지 확인
  const store = await getStoreById(storeId);
  if (!store) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  // 2. 가게가 존재하면 미션을 추가
  const newMissionId = await addMission(storeId, {
    content: missionData.content,
    point: missionData.point,
  });

  // 3. 매퍼를 사용하여 결과 반환 (여기!)
  return responseFromMission(newMissionId);
};