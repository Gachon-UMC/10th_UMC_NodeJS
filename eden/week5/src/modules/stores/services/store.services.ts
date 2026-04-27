import { AddStoreRequestDTO } from "../dtos/store.dtos.js";
import { addStore, getStoreById } from "../repositories/store.repositories.js";

export const createStore = async (regionId: number, storeData: AddStoreRequestDTO) => {
  // 데이터베이스에 가게 추가
  const newStoreId = await addStore(regionId, {
    name: storeData.name,
    foodCategory: storeData.foodCategory,
  });

  // 추가된 가게의 전체 정보 조회 후 반환
  const newStore = await getStoreById(newStoreId);

  return {
    id: newStore.id,
    name: newStore.name,
    region: newStore.region_name,
    foodCategory: newStore.food_category,
  };
};