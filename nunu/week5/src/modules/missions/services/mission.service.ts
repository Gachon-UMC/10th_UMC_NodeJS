import { responseFromUserMission } from "../dtos/mission.dto.js";
import {
  addUserMission,
  getMissionById,
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

  const review = await addUserMission(userId, missionId);

  return responseFromUserMission({
    id: review.id,
    createdAt: review.created_at,
    updatedAt: review.updated_at,
  });
};
