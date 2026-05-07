import { Router } from "express";
import {
  handleChallengeMission,
  handleCompleteMission,
} from "../modules/missions/controllers/mission.controller.js";

const router = Router();

router.post("/:missionId/challenges", handleChallengeMission);
router.patch("/:missionId/complete", handleCompleteMission);

export default router;
