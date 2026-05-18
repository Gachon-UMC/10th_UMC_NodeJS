import { prisma } from "../../../db.config.js";

export const getMissionById = async (
  missionId: number
) => {
  return await prisma.mission.findUnique({
    where: {
      id: missionId,
    },
  });
};

export const getUserMission = async (
  userId: number,
  missionId: number
) => {
  return await prisma.userMission.findFirst({
    where: {
      userId,
      missionId,
    },
  });
};

export const addUserMission = async (
  userId: number,
  missionId: number
) => {
  return await prisma.userMission.create({
    data: {
      userId,
      missionId,
      status: "진행중",
    },
  });
};