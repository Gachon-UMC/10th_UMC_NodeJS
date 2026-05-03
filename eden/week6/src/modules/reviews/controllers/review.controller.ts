import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { AddReviewRequestDTO } from "../dtos/review.dto";
import { createReview } from "../services/review.service";

import { listMyReviews } from "../services/review.service.js";

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

// 내가 작성한 리뷰 목록 조회 컨트롤러
export const handleListMyReviews = async (req: Request, res: Response) => {
    try {
        
        const userIdString = req.query.userId as string;

        // 유효성 검사
        if (!userIdString) {
            return res.status(400).send("userId가 필요합니다.");
        }

        const userId = parseInt(userIdString, 10);
        if (isNaN(userId)) {
            return res.status(400).send("유효한 숫자 형태의 userId가 필요합니다.");
        }

        // 서비스 호출 및 응답
        const reviews = await listMyReviews(userId);
        return res.status(200).json(reviews);

    } catch (error) {
        console.error("리뷰 목록 조회 중 오류 발생:", error);
        return res.status(500).send("서버 내부 오류 발생");
    }
}