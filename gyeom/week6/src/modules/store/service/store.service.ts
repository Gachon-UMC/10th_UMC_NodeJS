import { responseFromStore, StoreAddRequest, bodyToStore } from "../dto/store.dto.js";
import { addStore, getStore } from "../repository/store.repository.js";

export const storeAdd = async (data: StoreAddRequest) => {
  try {
    const store = await addStore(bodyToStore(data));
    const storeData = await getStore(Number(store.id));
    return responseFromStore({ store: storeData });
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  }
};