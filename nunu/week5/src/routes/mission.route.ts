import { Router } from "express";
import { handleCreateUserMission } from "../modules/missions/controllers/mission.controller.js";

const router = Router();

router.post("/:missionId/challenges", handleCreateUserMission);

export default router;
