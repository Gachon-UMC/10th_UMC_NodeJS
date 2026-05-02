import { responseFromUserMission } from "../dtos/mission.dto.js";
import {
  addUserMission,
  getMissionById,
  getUserMissionByMissionId,
} from "../repositories/mission.repository.js";

export const createUserMission = async (userId: number, missionId: number) => {
  // 미션 존재 확인
  const mission = await getMissionById(missionId);

  if (!mission) {
    const err = new Error("존재하지 않는 미션입니다.");
    (err as any).statusCode = 404;
    throw err;
  }

  // 이미 도전 중인 미션인지 확인
  const existingMission = await getUserMissionByMissionId(userId, missionId);

  if (existingMission) {
    const err = new Error("이미 도전 중인 미션입니다.");
    (err as any).statusCode = 409;
    throw err;
  }

  // 생성
  const userMission = await addUserMission(userId, missionId);

  return responseFromUserMission({
    id: Number(userMission.id),
    createdAt: userMission.createdAt.toISOString(),
    updatedAt: userMission.updatedAt.toISOString(),
  });
};
