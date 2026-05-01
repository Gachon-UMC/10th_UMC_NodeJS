import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { AddReviewRequestDTO } from "../dtos/review.dto";
import { createReview } from "../services/review.service";

export const handleAddReview = async (req: Request, res: Response, next: NextFunction) => {
  const { storeId: rawStoreId } = req.params;
    
  if (typeof rawStoreId !== 'string') {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "유효하지 않은 가게 ID입니다." });
  }

  const storeId = parseInt(rawStoreId, 10);
  
 
  // 요청 본문 전체를 DTO 타입으로 받음
  const reviewData: AddReviewRequestDTO = req.body;

  // 본문에 userId가 있는지 간단히 확인
  if (reviewData.userId === undefined) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "userId는 필수입니다." });
  }

  try {
    // 서비스 함수에 DTO 객체 전체를 전달
    const result = await createReview(storeId, reviewData);
    return res.status(StatusCodes.CREATED).json({ result });
  } catch (err) {
    next(err);
  }
};