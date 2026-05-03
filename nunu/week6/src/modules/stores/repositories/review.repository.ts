import { prisma } from "../../../db.config.js";
import { CreateReviewRequest } from "../dtos/review.dto.js";

export const addReview = async (
  userId: number,
  storeId: number,
  data: CreateReviewRequest,
) => {
  const created = await prisma.review.create({
    data: {
      userId: userId,
      storeId: storeId,
      content: data.content,
      starRate: data.starRate,
    },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return created;
};

// 가게 존재 확인
export const getStoreById = async (storeId: number) => {
  return await prisma.store.findFirst({
    where: { id: storeId },
  });
};

export const getMyReviewsByStore = async (
  userId: number,
  storeId: number,
  cursor: number,
) => {
  const reviews = await prisma.review.findMany({
    where: {
      userId,
      storeId,
      id: {
        gt: cursor,
      },
    },
    select: {
      id: true,
      content: true,
      starRate: true,
      createdAt: true,
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      id: "asc",
    },
    take: 6, // ⭐ 5개 + 1개
  });

  const hasNext = reviews.length > 5;

  return {
    reviews: hasNext ? reviews.slice(0, 5) : reviews,
    hasNext,
  };
};

// totalPages 계산
export const countReviewsByStore = async (userId: number, storeId: number) => {
  return await prisma.review.count({
    where: {
      userId,
      storeId,
    },
  });
};
