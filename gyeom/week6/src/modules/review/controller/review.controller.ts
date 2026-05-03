import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { reviewAdd, reviewList } from "../service/review.service.js";
import { ReviewAddRequest } from "../dto/review.dto.js";

export const handleAddReview = async (req: Request, res: Response) => {
  console.log("리뷰 추가 요청");
  console.log("body:", req.body);

  try {
    const storeId = Number(req.params.storeId);
    if (!req.params.storeId || Number.isNaN(storeId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: "유효하지 않은 storeId 입니다.",
        data: null,
      });
    }
    const body: ReviewAddRequest = req.body;
    const review = await reviewAdd(storeId, body);
    return res.status(StatusCodes.OK).json({
      success: true,
      statusCode: StatusCodes.OK,
      message: "리뷰 추가 성공",
      data: review,
    });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      statusCode: StatusCodes.BAD_REQUEST,
      message: (err as Error).message,
      data: null,
    });
  }
};

export const handleGetUserReviews = async (req: Request, res: Response) => {
  console.log("내 리뷰 목록 조회 요청");

  try {
    const userId = Number(req.params.userId);
    if (!req.params.userId || Number.isNaN(userId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: "유효하지 않은 userId 입니다.",
        data: null,
      });
    }
    const reviews = await reviewList(userId);
    return res.status(StatusCodes.OK).json({
      success: true,
      statusCode: StatusCodes.OK,
      message: "리뷰 목록 조회 성공",
      data: reviews,
    });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      statusCode: StatusCodes.BAD_REQUEST,
      message: (err as Error).message,
      data: null,
    });
  }
};
