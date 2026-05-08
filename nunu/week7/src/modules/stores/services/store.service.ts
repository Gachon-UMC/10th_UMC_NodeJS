import { StatusCodes } from "http-status-codes";
import { AppError } from "../../../common/errors.js";
import {
  responseFromStore,
  CreateStoreRequest,
  responseFromMissions,
} from "../dtos/store.dto.js";
import {
  addStore,
  countmissionsByStore,
  getMissionsByStore,
  getRegionById,
} from "../repositories/store.repository.js";
import { getStoreById } from "../repositories/review.repository.js";

export const createStore = async (data: CreateStoreRequest) => {
  // region 존재 확인
  const region = await getRegionById(data.regionId);

  if (!region) {
    throw new AppError("존재하지 않는 지역입니다.", StatusCodes.NOT_FOUND);
  }

  // DB 저장
  const store = await addStore({
    name: data.name,
    storeType: data.storeType,
    regionId: data.regionId,
  });

  // 응답 데이터 구성
  return responseFromStore({
    id: Number(store.id),
    name: data.name,
    createdAt: store.createdAt.toISOString(),
    updatedAt: store.updatedAt.toISOString(),
  });
};

export const getMissions = async (
  storeId: number,
  cursor: number,
  limit: number,
) => {
  const store = await getStoreById(storeId);

  if (!store) {
    throw new AppError("존재하지 않는 가게입니다.", StatusCodes.NOT_FOUND);
  }

  const { missions, hasNext } = await getMissionsByStore(
    storeId,
    cursor,
    limit,
  );

  const totalCount = await countmissionsByStore(storeId);
  const totalPages = Math.ceil(totalCount / limit);

  return responseFromMissions(missions, hasNext, totalPages);
};
