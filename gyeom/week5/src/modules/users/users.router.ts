import { Router } from "express";
import { handleUserSignUp, handleAddUserMission } from "./controllers/user.controller.js";

const router = Router();

router.post("/signup", handleUserSignUp);
router.post("/:userId/missions", handleAddUserMission);

export default router;