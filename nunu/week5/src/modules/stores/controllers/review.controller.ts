import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { createReview } from "../services/review.service.js";
import { CreateReviewRequest } from "../dtos/review.dto.js";

export const handleCreateReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("리뷰 생성을 요청했습니다!");
    console.log("body:", req.body);

    const storeId = Number(req.params.storeId);

    const review = await createReview(storeId, req.body as CreateReviewRequest);

    res.status(StatusCodes.CREATED).json({
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "리뷰 생성이 완료되었습니다.",
      data: review,
    });
  } catch (err) {
    next(err);
  }
};
