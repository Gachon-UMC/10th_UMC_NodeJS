import { UserMissionAddRequest, bodyToUserMission, responseFromUserMission, responseFromUserMissions } from "../dtos/user.dto.js";
import { getUser, addUserMission, getUserMission, getUserMissions, updateUserMissionStatus } from "../repositories/user.repository.js";
import { getMission } from "../../mission/repository/mission.repository.js";
import { UserMissionStatus } from "../../../generated/prisma/index.js";

export const userMissionAdd = async (userId: number, data: UserMissionAddRequest) => {
  try {
    const user = await getUser(userId);
    if (!user) {
      throw new Error("존재하지 않는 사용자입니다.");
    }
    const mission = await getMission(data.missionId);
    if (!mission) {
      throw new Error("존재하지 않는 미션입니다.");
    }
    const existing = await getUserMission(userId, data.missionId, UserMissionStatus.CHALLENGING);
    if (existing) {
      throw new Error("이미 도전 중인 미션입니다.");
    }
    const userMission = await addUserMission(userId, data.missionId, UserMissionStatus.CHALLENGING);
    return responseFromUserMission({ userMission });
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  }
};

export const userMissionList = async (userId: number, cursor?: number) => {
  try {
    const user = await getUser(userId);
    if (!user) {
      throw new Error("존재하지 않는 사용자입니다.");
    }
    const userMissions = await getUserMissions(BigInt(userId), UserMissionStatus.CHALLENGING, cursor);
    return responseFromUserMissions({ userMissions });
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  }
};

export const userMissionComplete = async (userId: number, missionId: number) => {
  try {
    const user = await getUser(userId);
    if (!user) {
      throw new Error("존재하지 않는 사용자입니다.");
    }
    const mission = await getMission(missionId);
    if (!mission) {
      throw new Error("존재하지 않는 미션입니다.");
    }
    const existing = await getUserMission(userId, missionId, UserMissionStatus.CHALLENGING);
    if (!existing) {
      throw new Error("진행 중인 미션이 아닙니다.");
    }
    return await updateUserMissionStatus(BigInt(userId), BigInt(missionId));
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  }
};