import { Router } from "express";
import { handleChallengeMission } from "../modules/missions/controllers/mission.controller.js";

const router = Router();

router.post("/:missionId/challenges", handleChallengeMission);

export default router;
