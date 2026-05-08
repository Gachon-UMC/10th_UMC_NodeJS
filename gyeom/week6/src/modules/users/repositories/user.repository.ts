import { prisma } from "../../../db.config.js";
import { UserMissionStatus } from "../../../generated/prisma/index.js";

export const getUser = async (userId: number) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });
};

export const getUserMission = async (userId: number, missionId: number, status: UserMissionStatus) => {
  return await prisma.userMission.findFirst({
    where: {
      userId,
      missionId,
      status,
    },
  });
};

export const addUserMission = async (userId: number, missionId: number, status: UserMissionStatus) => {
  return await prisma.userMission.create({
    data: {
      userId,
      missionId,
      status,
      createdAt: new Date(),
    },
    select: {
      id: true,
      userId: true,
      missionId: true,
      status: true,
    },
  });
};

export const getUserMissions = async (userId: bigint, status: UserMissionStatus, cursor?: number) => {
  return await prisma.userMission.findMany({
    where: {
      userId,
      status,
    },
    select: {
      id: true,
      userId: true,
      missionId: true,
      status: true,
    },
    orderBy: { createdAt: "desc" },
    take: 10,
    skip: cursor ? 1 : 0,
    ...(cursor ? { cursor: { id: cursor } } : {}),
  });
};

export const updateUserMissionStatus = async (userId: bigint, missionId: bigint) => {
  return await prisma.userMission.updateMany({
    where: {
      userId,
      missionId,
      status: UserMissionStatus.CHALLENGING,
    },
    data: {
      status: UserMissionStatus.DONE,
    },
  });
};