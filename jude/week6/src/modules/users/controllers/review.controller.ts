import { type Request, type Response, type NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { listStoreReviews } from "../services/review.service.js";
import { listUserReviews } from "../services/review.service.js";

export const handleListStoreReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const storeId = parseInt(req.params.storeId as string, 10);

    const reviews = await listStoreReviews(storeId);

    res.status(StatusCodes.OK).json(reviews);
  } catch (err) {
    next(err);
  }
};

export const handleCreateReview = async (req: Request, res: Response) => {
    
    const userId = 1; 
    const cursor = req.query.cursor ? Number(req.query.cursor) : undefined;

    try {
        const data = await listUserReviews(userId, cursor);
        
        
        return res.status(StatusCodes.OK).json({
            success: true,
            result: data
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "리뷰 목록을 불러오는 중 오류가 발생했습니다."
        });
    }
};