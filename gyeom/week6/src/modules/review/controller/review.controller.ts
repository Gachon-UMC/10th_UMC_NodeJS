import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { reviewAdd , reviewList} from "../service/review.service.js";
import { ReviewAddRequest } from "../dto/review.dto.js";

export const handleAddReview = async (req: Request, res: Response) => {
  console.log("리뷰 추가 요청");
  console.log("body:", req.body);

  const storeId = Number(req.params.storeId);
  const review = await reviewAdd(storeId, req.body as ReviewAddRequest);
  res.status(StatusCodes.OK).json({ result: review });
};

export const handleGetUserReviews = async (req: Request, res: Response) => {
  console.log("내 리뷰 목록 조회 요청");

  try {
    const userId = Number(req.params.userId);
    const reviews = await reviewList(userId);
    res.status(StatusCodes.OK).json({ result: reviews });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: (err as Error).message });
  }
};