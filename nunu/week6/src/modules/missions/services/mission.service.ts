import { getStoreById } from "../../stores/repositories/review.repository.js";
import {
  responseFromCompletedMission,
  responseFromMissions,
  responseFromUserMission,
} from "../dtos/mission.dto.js";
import {
  addUserMission,
  countmissionsByStore,
  getMissionById,
  getMissionsByStore,
  getUserMissionByMissionId,
  updateUserMissionStatus,
} from "../repositories/mission.repository.js";

export const createChallangeMission = async (
  userId: number,
  missionId: number,
) => {
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

export const getMissions = async (
  storeId: number,
  cursor: number,
  limit: number,
) => {
  const store = await getStoreById(storeId);

  if (!store) {
    const err = new Error("존재하지 않는 가게입니다.");
    (err as any).statusCode = 404;
    throw err;
  }

  const { missions, hasNext } = await getMissionsByStore(
    storeId,
    cursor,
    limit,
  );

  const totalCount = await countmissionsByStore(storeId);
  const totalPages = Math.ceil(totalCount / limit);

  return responseFromMissions(missions, hasNext, totalPages);
};

export const completeUserMission = async (
  userId: number,
  missionId: number,
) => {
  // 존재 여부 확인
  const existing = await getUserMissionByMissionId(userId, missionId);

  if (!existing) {
    const err = new Error("해당 미션을 도전한 기록이 없습니다.");
    (err as any).statusCode = 404;
    throw err;
  }

  // 이미 완료된 경우
  if (existing.status === 1) {
    const err = new Error("이미 완료된 미션입니다.");
    (err as any).statusCode = 409;
    throw err;
  }

  await updateUserMissionStatus(userId, missionId);

  const result = responseFromCompletedMission(missionId);

  return result;
};
