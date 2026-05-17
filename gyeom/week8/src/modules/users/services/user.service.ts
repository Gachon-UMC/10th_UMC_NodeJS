import {
  UserMissionAddRequest,
  UserMissionAddResponse,
  UserMissionListResponse,
  UserMissionCompleteResponse,
  toUserMissionResponse,
} from "../dtos/user.dto.js";
import {
  getUser,
  addUserMission,
  getUserMission,
  getUserMissions,
  updateUserMissionStatus,
} from "../repositories/user.repository.js";
import { getMission } from "../../mission/repository/mission.repository.js";
import { UserMissionStatus } from "../../../generated/prisma/index.js";
import {
  UserNotFoundError,
  MissionNotFoundError,
  AlreadyChallengingError,
  NotChallengingError,
} from "../../../common/errors/error.js";

export const userMissionAdd = async (
  userId: number,
  data: UserMissionAddRequest
): Promise<UserMissionAddResponse> => {
  const user = await getUser(userId);
  if (!user) {
    throw new UserNotFoundError();
  }

  const mission = await getMission(data.missionId);
  if (!mission) {
    throw new MissionNotFoundError();
  }

  const existing = await getUserMission(userId, data.missionId, UserMissionStatus.CHALLENGING);
  if (existing) {
    throw new AlreadyChallengingError();
  }

  const userMission = await addUserMission(userId, data.missionId, UserMissionStatus.CHALLENGING);
  return toUserMissionResponse(userMission);
};

export const userMissionList = async (
  userId: number,
  cursor?: number
): Promise<UserMissionListResponse> => {
  const user = await getUser(userId);
  if (!user) {
    throw new UserNotFoundError();
  }

  const userMissions = await getUserMissions(BigInt(userId), UserMissionStatus.CHALLENGING, cursor);
  return {
    userMissions: userMissions.map(toUserMissionResponse),
  };
};

export const userMissionComplete = async (
  userId: number,
  missionId: number
): Promise<UserMissionCompleteResponse> => {
  const user = await getUser(userId);
  if (!user) {
    throw new UserNotFoundError();
  }

  const mission = await getMission(missionId);
  if (!mission) {
    throw new MissionNotFoundError();
  }

  const existing = await getUserMission(userId, missionId, UserMissionStatus.CHALLENGING);
  if (!existing) {
    throw new NotChallengingError();
  }

  const result = await updateUserMissionStatus(BigInt(userId), BigInt(missionId));
  return { count: result.count };
};