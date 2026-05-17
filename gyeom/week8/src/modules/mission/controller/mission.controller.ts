import { Body, Controller, Get, Path, Post, Queries, Route, Tags, Response } from "tsoa";
import { MissionAddRequest, MissionAddResponse, MissionListResponse, MissionAddApiResponse, MissionListApiResponse } from "../dto/mission.dto.js";
import { missionAdd, storeMissionList } from "../service/mission.service.js";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../../common/errors/app.error.js";
import { ApiResponse, success } from "../../../common/responses/response.js";

interface MissionListQuery {
  /** 페이지네이션 커서 */
  cursor?: number;
}

@Route("stores")
@Tags("Missions")
export class MissionController extends Controller {
  /**
   * 미션 추가 API
   * @summary 특정 가게에 미션을 추가하는 엔드포인트입니다.
   */
  @Post("{storeId}/missions")
  @Response<MissionAddApiResponse>(200, "미션 추가 성공", {
    success: true,
    statusCode: 200,
    message: "미션 추가 성공",
    data: { id: 1, storeId: 1, content: "1만원 이상 주문하기", rewardPoint: 500, deadline: 30 },
  })
  @Response<MissionAddApiResponse>(404, "존재하지 않는 가게입니다.", {
    success: false,
    statusCode: 404,
    message: "존재하지 않는 가게입니다.",
    data: null,
  })
  @Response<MissionAddApiResponse>(500, "서버 내부 오류", {
    success: false,
    statusCode: 500,
    message: "서버 내부 오류",
    data: null,
  })
  public async handleAddMission(
    @Path() storeId: number,
    @Body() body: MissionAddRequest,
  ): Promise<ApiResponse<MissionAddResponse>> {
    try {
      const mission = await missionAdd(storeId, body);
      return success(StatusCodes.OK, "미션 추가 성공", mission);
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

  /**
   * 가게 미션 목록 조회 API
   * @summary 특정 가게의 미션 목록을 조회하는 엔드포인트입니다.
   */
  @Get("{storeId}/missions")
  @Response<MissionListApiResponse>(200, "미션 목록 조회 성공", {
    success: true,
    statusCode: 200,
    message: "미션 목록 조회 성공",
    data: { missions: [{ id: 1, storeId: 1, content: "1만원 이상 주문하기", rewardPoint: 500, deadline: 30 }] },
  })
  @Response<MissionListApiResponse>(404, "존재하지 않는 가게입니다.", {
    success: false,
    statusCode: 404,
    message: "존재하지 않는 가게입니다.",
    data: null,
  })
  @Response<MissionListApiResponse>(500, "서버 내부 오류", {
    success: false,
    statusCode: 500,
    message: "서버 내부 오류",
    data: null,
  })
  public async handleGetStoreMissions(
    @Path() storeId: number,
    @Queries() query: MissionListQuery,
  ): Promise<ApiResponse<MissionListResponse>> {
    try {
      const missions = await storeMissionList(storeId, query.cursor);
      return success(StatusCodes.OK, "미션 목록 조회 성공", missions);
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