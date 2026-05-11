import { StatusCodes } from "http-status-codes";
import { AddReviewRequestDTO } from "../dtos/review.dto";
import { createReview, listMyReviews, listStoreReviews } from "../services/review.service";
import { Body, Controller, Get, Post, Path, Query, Route, Tags, SuccessResponse } from "tsoa";
import { AppError } from "../../../common/errors/app.error";

@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {

  // 특정 가게에 리뷰 추가 (POST /reviews/{storeId})
  @Post("{storeId}")
  @SuccessResponse(StatusCodes.CREATED, "Created")
  public async addReview(
    @Path() storeId: number,
    @Body() reviewData: AddReviewRequestDTO
  ) { 
    if (!storeId || Number.isNaN(storeId)) {
    throw new AppError({
      errorCode: "INVALID_STORE_ID",
      message: "존재하지 않는 가게입니다.",
      statusCode: 400
    });
  }
    const result = await createReview(storeId, reviewData);

    this.setStatus(StatusCodes.CREATED);
    return { result };
  }

  //내가 작성한 리뷰 목록 조회 (GET /reviews)
  @Get("my")
  public async listMyReviews(
    @Query() userId: number
  ) {
        const reviews = await listMyReviews(userId);
    return reviews;
  }

  //특정 가게의 리뷰 목록 조회 (GET /reviews/{storeId})
  @Get("{storeId}")
  public async listStoreReviews(
    @Path() storeId: number,
    @Query() cursor: number
  ) {
    const reviews = await listStoreReviews(storeId, cursor);
    return reviews;
  }
}
