import { responseFromStore, StoreRequest } from "../dtos/store.dto.js";
import { addStore, getRegionById } from "../repositories/store.repository.js";

export const createStore = async (data: StoreRequest) => {
  // 필수값 체크
  if (!data.name || !data.storeType || !data.regionId) {
    const err = new Error("필수값이 누락되었습니다.");
    (err as any).statusCode = 400;
    throw err;
  }

  // region 존재 확인
  const region = await getRegionById(data.regionId);

  if (!region) {
    const err = new Error("존재하지 않는 지역입니다.");
    (err as any).statusCode = 404;
    throw err;
  }

  // DB 저장
  const storeId = await addStore({
    name: data.name,
    storeType: data.storeType,
    regionId: data.regionId,
  });

  // 응답 데이터 구성
  return responseFromStore({
    id: storeId,
    name: data.name,
  });
};
