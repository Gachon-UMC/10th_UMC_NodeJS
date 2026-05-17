import { Router } from "express";
import { handleAddUserMission, handleGetUserMissions, handleCompleteUserMission } from "./controllers/user.controller.js";
import { handleGetUserReviews } from "../review/controller/review.controller.js";

const router = Router();

router.post("/:userId/missions", handleAddUserMission);
router.get("/:userId/reviews", handleGetUserReviews);
router.get("/:userId/missions", handleGetUserMissions);
router.patch("/:userId/missions/:missionId", handleCompleteUserMission);

export default router;
