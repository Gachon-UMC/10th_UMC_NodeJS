import { StoreAddRequest, StoreAddResponse } from "../dto/store.dto.js";
import { addStore, getStore } from "../repository/store.repository.js";

export const storeAdd = async (data: StoreAddRequest): Promise<StoreAddResponse> => {
  const store = await addStore(data);
  const storeData = await getStore(Number(store.id));
  return {
    id: Number(storeData?.id),
    name: storeData?.name ?? "",
    regionId: Number(storeData?.regionId),
  };
};