import { prisma } from "../../../db.config.js";

export const getStoreById = async (storeId: number) => {
  return await prisma.store.findUnique({
    where: { id: storeId },
  });
};

export const addReview = async (
  userId: number,
  storeId: number,
  rating: number,
  content: string
) => {
  return await prisma.review.create({
    data: {
      userId,
      storeId,
      rating,
      content,
    },
  });
};

export const addMission = async (
  storeId: number,
  title: string,
  description: string,
  rewardPoint: number,
  deadline: string
) => {
  return await prisma.mission.create({
    data: {
      storeId,
      title,
      description,
      rewardPoint,
      deadline: new Date(deadline),
    },
  });
};

export const getMyReviews = async (
  userId: number,
  cursor?: number
) => {
  return await prisma.review.findMany({
    where: {
      userId,
      ...(cursor && {
        id: {
          lt: cursor,
        },
      }),
    },
    orderBy: {
      id: "desc",
    },
    take: 10,
    include: {
      store: true,
    },
  });
};

export const getMissionsByStoreId = async (storeId: number) => {
  return await prisma.mission.findMany({
    where: {
      storeId,
    },
    orderBy: {
      id: "asc",
    },
  });
};

export const completeMission = async (
  userMissionId: number
) => {
  return await prisma.userMission.update({
    where: {
      id: userMissionId,
    },
    data: {
      status: "COMPLETE",
    },
  });
};