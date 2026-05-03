import { Router } from "express";
import { handleAddReview, handleListMyReviews } from "./controllers/review.controller.js";

const reviewsRouter = Router();

// /api/v1/stores/:storeId/reviews
reviewsRouter.post("/reviews/:storeId", handleAddReview);
reviewsRouter.get("/reviews", handleListMyReviews);
export default reviewsRouter;