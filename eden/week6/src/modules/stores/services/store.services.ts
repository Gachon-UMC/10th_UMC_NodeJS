import { AddStoreRequestDTO, responseFromReviews, responseFromStore, ReviewListResponse } from "../dtos/store.dtos.js";
import {  addStore, getAllStoreReviews, getStoreById} from "../repositories/store.repositories.js";

export const createStore = async (regionId: number, storeData: AddStoreRequestDTO) => {
  const { name, foodCategory } = storeData;

  
  const newStoreId = await addStore(regionId, { name, foodCategory });

 
  const newStore = await getStoreById(newStoreId);


  return responseFromStore(newStore);
};



export const listStoreReviews = async (
storeId: number, cursor: number): Promise<ReviewListResponse> => {
  const reviews = await getAllStoreReviews(storeId, cursor);
  return responseFromReviews(reviews);
};