import { responseFromStore, StoreAddRequest, bodyToStore } from "../dto/store.dto.js";
import { addStore, getStore } from "../repository/store.repository.js";

export const storeAdd = async (data: StoreAddRequest) => {
  try {
    const storeId = await addStore(bodyToStore(data));
    const store = await getStore(storeId);
    return responseFromStore({ store });
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  }
};