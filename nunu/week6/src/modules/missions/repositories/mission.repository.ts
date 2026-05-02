import { RowDataPacket } from "mysql2";
import { pool, prisma } from "../../../db.config.js";

export const addUserMission = async (userId: number, missionId: number) => {
  const created = await prisma.userMission.create({
    data: {
      userId: userId,
      missionId: missionId,
      status: 0, // 0: 진행중, 1: 완료
    },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return created;
};

// 미션 존재 확인
export const getMissionById = async (missionId: number) => {
  return await prisma.mission.findFirst({
    where: { id: missionId },
  });
};

// 이미 도전 중인 미션인지 확인
export const getUserMissionByMissionId = async (
  userId: number,
  missionId: number,
) => {
  return await prisma.userMission.findFirst({
    where: {
      userId: userId,
      missionId: missionId,
    },
  });
};
