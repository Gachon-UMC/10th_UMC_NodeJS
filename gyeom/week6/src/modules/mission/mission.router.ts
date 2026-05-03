import { Router } from "express";
import { handleAddMission, handleGetStoreMissions } from "./controller/mission.controller.js";

const router = Router();

router.post("/:storeId/missions", handleAddMission);
router.get("/:storeId/missions", handleGetStoreMissions);

export default router;
