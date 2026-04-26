import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { reviewAdd } from "../service/review.service.js";
import { ReviewAddRequest } from "../dto/review.dto.js";

export const handleAddReview = async (req: Request, res: Response) => {
  console.log("리뷰 추가 요청");
  console.log("body:", req.body);

  const storeId = Number(req.params.storeId);
  const review = await reviewAdd(storeId, req.body as ReviewAddRequest);
  res.status(StatusCodes.OK).json({ result: review });
};