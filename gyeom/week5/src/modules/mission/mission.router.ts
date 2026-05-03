import { Router } from "express";
import { handleAddMission } from "./controller/mission.controller.js";

const router = Router();

router.post("/:storeId/missions", handleAddMission);

export default router;