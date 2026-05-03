import { Router } from "express";
import { handleAddReview } from "./controller/review.controller.js";

const router = Router();

router.post("/:storeId/reviews", handleAddReview);

export default router;