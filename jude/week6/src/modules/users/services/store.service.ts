import { getAllStoreReviews } from "../repositories/store.repository.js";
import { responseFromReviews } from "../dtos/review.dto.js";

export const listStoreReviews = async (storeId: number, cursor: number) => {
    
    const reviews = await getAllStoreReviews(storeId, cursor);
    
    return responseFromReviews(reviews);
};