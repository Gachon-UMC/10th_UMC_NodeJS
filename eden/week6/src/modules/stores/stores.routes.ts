import { Router } from "express";
import { handleAddStore, handleListStoreReviews } from "./controllers/store.controllers.js";

const storesRouter = Router();

// /api/v1/region/:regionId/stores
storesRouter.post("/region/:regionId/stores", handleAddStore);
storesRouter.get("/stores/:storeId/reviews", handleListStoreReviews);

export default storesRouter;