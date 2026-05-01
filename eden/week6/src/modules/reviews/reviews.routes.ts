import { Router } from "express";
import { handleAddReview } from "./controllers/review.controller.js";

const reviewsRouter = Router();

// /api/v1/stores/:storeId/reviews
reviewsRouter.post("/stores/:storeId/reviews", handleAddReview);

export default reviewsRouter;