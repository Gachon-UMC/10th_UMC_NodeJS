import { Router } from "express";
import { handleAddStore } from "./controllers/store.controllers.js";

const storesRouter = Router();

// /api/v1/region/:regionId/stores
storesRouter.post("/region/:regionId/stores", handleAddStore);

export default storesRouter;