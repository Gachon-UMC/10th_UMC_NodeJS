import { Body, Controller, Get, Path, Post, Queries, Route, Tags } from "tsoa";
import { MissionAddRequest, MissionAddResponse, MissionListResponse } from "../dto/mission.dto.js";
import { missionAdd, storeMissionList } from "../service/mission.service.js";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../../common/errors/app.error.js";
import { ApiResponse, success } from "../../../common/responses/response.js";

interface MissionListQuery {
  cursor?: number;
}

@Route("stores")
@Tags("Missions")
export class MissionController extends Controller {
  @Post("{storeId}/missions")
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

  @Get("{storeId}/missions")
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