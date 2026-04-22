import { responseFromUserMission } from "../dtos/mission.dto.js";
import {
  addUserMission,
  getMissionById,
  getUserMissionByMissionId,
} from "../repositories/mission.repository.js";

export const postUserMission = async (missionId: number) => {
  const userId = 1; // 첫 번째 유저로 고정 (인증 기능이 없으므로)

  // 미션 존재 확인
  const mission = await getMissionById(missionId);

  if (!mission) {
    const err = new Error("존재하지 않는 미션입니다.");
    (err as any).statusCode = 404;
    throw err;
  }

  // 이미 도전 중인 미션인지 확인
  const existing = await getUserMissionByMissionId(userId, missionId);

  if (existing) {
    const err = new Error("이미 도전 중인 미션입니다.");
    (err as any).statusCode = 400;
    throw err;
  }

  // 생성
  const userMission = await addUserMission(userId, missionId);

  return responseFromUserMission({
    id: userMission.id,
    createdAt: userMission.created_at,
    updatedAt: userMission.updated_at,
  });
};
