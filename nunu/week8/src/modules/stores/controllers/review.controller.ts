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
import {
  InvalidPaginationQueryError,
  InvalidStarRateError,
  InvalidStoreIdError,
  MissingReviewFieldError,
  UnauthorizedUserError,
} from "../../../common/customError.js";

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
      throw new InvalidStoreIdError();
    }

    // userId 검증
    if (!userId) {
      throw new UnauthorizedUserError();
    }

    const { content, starRate } = data;

    // body 검증
    if (!content || starRate === undefined) {
      throw new MissingReviewFieldError();
    }

    // 별점 범위 체크
    if (starRate < 0 || starRate > 5) {
      throw new InvalidStarRateError();
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
      throw new UnauthorizedUserError();
    }

    // storeId 검증
    if (!storeId || Number.isNaN(storeId)) {
      throw new InvalidStoreIdError();
    }

    // cursor, limit 검증
    if (Number.isNaN(cursor) || Number.isNaN(limit) || limit < 1) {
      throw new InvalidPaginationQueryError();
    }

    const reviews = await getMyReviews(userId, storeId, cursor, limit);

    return success(
      reviews,
      "내 리뷰 목록 조회를 성공했습니다.",
      StatusCodes.OK,
    );
  }
}
