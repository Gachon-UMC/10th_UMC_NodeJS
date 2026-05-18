import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Patch,
  Query,
  Route,
  Tags,
  Response,
} from "tsoa";

import { success, ApiResponse } from "../../../common/responses/response.js";

import {
  getMyReviewsService,
  getMissionsByStoreService,
  createReview,
  createMission,
  completeMissionService,
} from "../services/store.service.js";

import {
  AddMissionRequest,
  AddReviewRequest,
  responseFromReviews,
} from "../dtos/store.dto.js";

@Route("stores")
@Tags("Stores")
export class StoreController extends Controller {

  /**
   * 가게 리뷰 등록 API
   * @summary 특정 가게에 리뷰를 등록합니다.
   */
  @Post("{storeId}/reviews")
  @Response<ApiResponse<null>>(200, "리뷰 등록 성공")
  @Response<ApiResponse<null>>(404, "가게를 찾을 수 없음")
  public async handleAddReview(
    @Path() storeId: number,
    @Body() body: AddReviewRequest
  ) {
    await createReview(storeId, body);

    return success({
      message: "리뷰 등록 완료",
    });
  }

  /**
   * 가게 미션 등록 API
   * @summary 특정 가게에 미션을 등록합니다.
   */
  @Post("{storeId}/missions")
  @Response<ApiResponse<null>>(200, "미션 등록 성공")
  @Response<ApiResponse<null>>(404, "가게를 찾을 수 없음")
  public async handleAddMission(
    @Path() storeId: number,
    @Body() body: AddMissionRequest
  ) {
    await createMission(storeId, body);

    return success({
      message: "미션 등록 완료",
    });
  }

  /**
   * 내가 작성한 리뷰 조회 API
   * @summary 사용자 리뷰 목록을 조회합니다.
   */
  @Get("/reviews/my")
  @Response<ApiResponse<any>>(200, "리뷰 조회 성공")
  public async handleGetMyReviews(
    @Query() cursor?: number
  ) {
    const userId = 1;

    const reviews = await getMyReviewsService(userId, cursor);

    return success(responseFromReviews(reviews));
  }

  /**
   * 특정 가게 미션 조회 API
   * @summary 특정 가게의 미션 목록을 조회합니다.
   */
  @Get("{storeId}/missions")
  @Response<ApiResponse<any>>(200, "미션 조회 성공")
  public async handleGetStoreMissions(
    @Path() storeId: number,
    @Query() cursor?: number
  ) {
    const missions = await getMissionsByStoreService(
      storeId,
      cursor
    );

    return success(missions);
  }

  /**
   * 미션 완료 처리 API
   * @summary 사용자의 미션 상태를 COMPLETE로 변경합니다.
   */
  @Patch("/missions/{userMissionId}/complete")
  @Response<ApiResponse<null>>(200, "미션 완료 성공")
  public async handleCompleteMission(
    @Path() userMissionId: number
  ) {
    await completeMissionService(userMissionId);

    return success({
      message: "미션 완료 처리 성공",
    });
  }
}