import { Router } from "express";
import userRoutes from "./user.route.js";
import storeRoutes from "./store.route.js";
import missionRoutes from "./mission.route.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/stores", storeRoutes);
router.use("/missions", missionRoutes);

export default router;
