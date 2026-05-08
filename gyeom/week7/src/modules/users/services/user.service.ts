import {
  UserMissionAddRequest,
  UserMissionAddResponse,
  UserMissionListResponse,
  UserMissionCompleteResponse
} from "../dtos/user.dto.js";

import {
  getUser,
  addUserMission,
  getUserMission,
  getUserMissions,
  updateUserMissionStatus
} from "../repositories/user.repository.js";

import { getMission } from "../../mission/repository/mission.repository.js";

import { UserMissionStatus } from "../../../generated/prisma/index.js";

import { StatusCodes } from "http-status-codes";

import { AppError } from "../../../common/errors/app.error.js";


export const userMissionAdd = async (
  userId: number,
  data: UserMissionAddRequest
): Promise<UserMissionAddResponse> => {

  const user = await getUser(userId);

  if (!user) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "존재하지 않는 사용자입니다."
    );
  }

  const mission = await getMission(data.missionId);

  if (!mission) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "존재하지 않는 미션입니다."
    );
  }

  const existing = await getUserMission(
    userId,
    data.missionId,
    UserMissionStatus.CHALLENGING
  );

  if (existing) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "이미 도전 중인 미션입니다."
    );
  }

  const userMission = await addUserMission(
    userId,
    data.missionId,
    UserMissionStatus.CHALLENGING
  );

  return {
    id: Number(userMission.id),
    userId: Number(userMission.userId),
    missionId: Number(userMission.missionId),
    status: userMission.status,
  };
};


export const userMissionList = async (
  userId: number,
  cursor?: number
): Promise<UserMissionListResponse> => {

  const user = await getUser(userId);

  if (!user) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "존재하지 않는 사용자입니다."
    );
  }

  const userMissions = await getUserMissions(
    BigInt(userId),
    UserMissionStatus.CHALLENGING,
    cursor
  );

  return {
    userMissions: userMissions.map((userMission) => ({
      id: Number(userMission.id),
      userId: Number(userMission.userId),
      missionId: Number(userMission.missionId),
      status: userMission.status,
    })),
  };
};


export const userMissionComplete = async (
  userId: number,
  missionId: number
): Promise<UserMissionCompleteResponse> => {

  const user = await getUser(userId);

  if (!user) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "존재하지 않는 사용자입니다."
    );
  }

  const mission = await getMission(missionId);

  if (!mission) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "존재하지 않는 미션입니다."
    );
  }

  const existing = await getUserMission(
    userId,
    missionId,
    UserMissionStatus.CHALLENGING
  );

  if (!existing) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "진행 중인 미션이 아닙니다."
    );
  }

  const result = await updateUserMissionStatus(
    BigInt(userId),
    BigInt(missionId)
  );

  return {
    count: result.count
  };
};