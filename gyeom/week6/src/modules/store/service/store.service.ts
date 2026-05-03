import { responseFromStore, StoreAddRequest, bodyToStore,
  ReviewListResponse, responseFromReviews
} from "../dto/store.dto.js";
import {
  addStore,
  getStore,
  // getAllStoreReviews
} from "../repository/store.repository.js";

export const storeAdd = async (data: StoreAddRequest) => {
  try {
    const store = await addStore(bodyToStore(data));
    const storeData = await getStore(Number(store.id));
    return responseFromStore({ store: storeData });
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  }
};

// export const listStoreReviews = async (
//   storeId: number,
//   cursor: number
// ): Promise<ReviewListResponse> => {
//   const reviews = await getAllStoreReviews(storeId, cursor);
//   return responseFromReviews(reviews);
// };
