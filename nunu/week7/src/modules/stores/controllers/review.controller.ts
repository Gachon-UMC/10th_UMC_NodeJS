import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
  Tags,
} from "tsoa";
import { StatusCodes } from "http-status-codes";
import { createReview, getMyReviews } from "../services/review.service.js";
import { CreateReviewRequest } from "../dtos/review.dto.js";
import { AppError } from "../../../common/errors.js";
import { success } from "../../../common/responses.js";

@Route("stores")
@Tags("Review")
export class ReviewController extends Controller {
  @SuccessResponse(StatusCodes.CREATED, "리뷰 생성 성공")
  @Post("{storeId}/reviews")
  public async handleCreateReview(
    @Path() storeId: number,
    @Body() data: CreateReviewRequest,
  ) {
    console.log("리뷰 생성을 요청했습니다!");

    const userId = 1; // 임시 userId

    // storeId 검증
    if (!storeId || Number.isNaN(storeId)) {
      throw new AppError(
        "유효하지 않은 storeId 입니다.",
        StatusCodes.BAD_REQUEST,
      );
    }

    // userId 검증
    if (!userId) {
      throw new AppError("사용자 정보가 없습니다.", StatusCodes.UNAUTHORIZED);
    }

    const { content, starRate } = data;

    // body 검증
    if (!content || starRate === undefined) {
      throw new AppError("필수값이 누락되었습니다.", StatusCodes.BAD_REQUEST);
    }

    // 별점 범위 체크
    if (starRate < 0 || starRate > 5) {
      throw new AppError(
        "별점은 0~5 사이여야 합니다.",
        StatusCodes.BAD_REQUEST,
      );
    }

    const review = await createReview(userId, storeId, {
      content,
      starRate,
    });

    this.setStatus(StatusCodes.CREATED);

    return success(review, "리뷰 생성이 완료되었습니다.", StatusCodes.CREATED);
  }

  @Get("{storeId}/reviews/me")
  public async handleGetMyReviews(
    @Path() storeId: number,
    @Query() cursor: number = 0,
    @Query() limit: number = 10,
  ) {
    console.log("내 리뷰 목록 조회를 요청했습니다!");

    const userId = 1;

    // userId 검증
    if (!userId) {
      throw new AppError("사용자 정보가 없습니다.", StatusCodes.UNAUTHORIZED);
    }

    // storeId 검증
    if (!storeId || Number.isNaN(storeId)) {
      throw new AppError(
        "유효하지 않은 storeId 입니다.",
        StatusCodes.BAD_REQUEST,
      );
    }

    // cursor, limit 검증
    if (Number.isNaN(cursor) || Number.isNaN(limit) || limit < 1) {
      throw new AppError(
        "유효하지 않은 cursor 또는 limit 입니다.",
        StatusCodes.BAD_REQUEST,
      );
    }

    const reviews = await getMyReviews(userId, storeId, cursor, limit);

    return success(
      reviews,
      "내 리뷰 목록 조회를 성공했습니다.",
      StatusCodes.OK,
    );
  }
}
