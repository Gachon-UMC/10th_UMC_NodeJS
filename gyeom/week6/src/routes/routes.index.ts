import { Router } from "express";
import storeRouter from "../modules/store/store.router.js";
import reviewRouter from "../modules/review/review.router.js";
import missionRouter from "../modules/mission/mission.router.js";
import userRouter from "../modules/users/users.router.js";

const router = Router();

router.use("/api/v1/stores", storeRouter);
router.use("/api/v1/stores", reviewRouter);
router.use("/api/v1/stores", missionRouter);
router.use("/api/v1/users", userRouter);

export default router;
