import { prisma } from "../../../db.config.js";
import { CreateStoreRequest } from "../dtos/store.dto.js";

// 가게 생성
export const addStore = async (data: CreateStoreRequest) => {
  const { name, storeType, regionId } = data;
  return await prisma.store.create({
    data: {
      name,
      storeType,
      regionId,
    },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

// 지역 존재 확인
export const getRegionById = async (regionId: number) => {
  return await prisma.region.findFirst({
    where: { id: regionId },
  });
};
