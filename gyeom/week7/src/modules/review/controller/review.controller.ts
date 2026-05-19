import { Body, Controller, Get, Path, Post, Route, Tags } from "tsoa";
import { ReviewAddRequest, ReviewAddResponse, ReviewListResponse } from "../dto/review.dto.js";
import { reviewAdd, reviewList } from "../service/review.service.js";
import { AppError } from "../../../common/errors/app.error.js";
import { ApiResponse, success } from "../../../common/responses/response.js";
import { StatusCodes } from "http-status-codes";

@Route("")
@Tags("Reviews")
export class ReviewController extends Controller {
  @Post("stores/{storeId}/reviews")
  public async handleAddReview(
    @Path() storeId: number,
    @Body() body: ReviewAddRequest,
  ): Promise<ApiResponse<ReviewAddResponse>> {
    try {
      const review = await reviewAdd(storeId, body);
      return success(StatusCodes.OK, "리뷰 추가 성공", review);
    } catch (err) {
      if (err instanceof AppError) {
        throw err;
      }

      throw new AppError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        (err as Error).message || "서버 내부 오류"
      );
    }
  }

  @Get("users/{userId}/reviews")
  public async handleGetUserReviews(
    @Path() userId: number,
  ): Promise<ApiResponse<ReviewListResponse>> {
    try {
      const reviews = await reviewList(userId);
      return success(StatusCodes.OK, "리뷰 목록 조회 성공", reviews);
    } catch (err) {
      if (err instanceof AppError) {
        throw err;
      }

      throw new AppError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        (err as Error).message || "서버 내부 오류"
      );
    }
  }
}