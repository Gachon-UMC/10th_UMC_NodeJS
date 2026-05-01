import { Router } from "express";
import { handleAddMission } from "./controllers/mission.controller.js";

const missionsRouter = Router();

// /api/v1/stores/:storeId/missions
missionsRouter.post("/stores/:storeId/missions", handleAddMission);

export default missionsRouter;