import { Router } from "express";
import { handleCreateStore } from "../modules/stores/controllers/store.controller.js";
import { handleCreateReview } from "../modules/stores/controllers/review.controller.js";

const router = Router();

router.post("/", handleCreateStore);
router.post("/:storeId/reviews", handleCreateReview);

export default router;
