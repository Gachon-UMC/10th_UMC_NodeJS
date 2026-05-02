import { prisma } from "../../../db.config.js";
import { CreateStoreRequest } from "../dtos/store.dto.js";

// 가게 생성
export const addStore = async (data: CreateStoreRequest) => {
  const created = await prisma.store.create({
    data: {
      name: data.name,
      storeType: data.storeType,
      regionId: data.regionId,
    },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return created;
};

// 지역 존재 확인
export const getRegionById = async (regionId: number) => {
  return await prisma.region.findFirst({
    where: { id: regionId },
  });
};
