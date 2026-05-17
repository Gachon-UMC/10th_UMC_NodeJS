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

    const userId = 1; // 첫 번째 유저로 고정 (인증 기능이 없으므로)

    const storeId = Number(req.params.storeId);

    // storeId 검증
    if (!req.params.storeId || Number.isNaN(storeId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: "유효하지 않은 storeId 입니다.",
        data: null,
      });
    }

    // userId 검증
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        statusCode: StatusCodes.UNAUTHORIZED,
        message: "사용자 정보가 없습니다.",
        data: null,
      });
    }

    // 요청 body 검증
    const { content, starRate } = req.body as CreateReviewRequest;

    if (!content || starRate === undefined) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: "필수값이 누락되었습니다.",
        data: null,
      });
    }

    // 별점 범위 체크
    if (starRate < 0 || starRate > 5) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: "별점은 0~5 사이여야 합니다.",
        data: null,
      });
    }

    const review = await createReview(userId, storeId, {
      content,
      starRate,
    });

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
