import {
  Controller,
  Get,
  Patch,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
  Tags,
} from "tsoa";
import { StatusCodes } from "http-status-codes";
import {
  completeUserMission,
  createChallangeMission,
  getMissions,
} from "../services/mission.service.js";
import { AppError } from "../../../common/errors.js";
import { success } from "../../../common/responses.js";

@Route("missions")
@Tags("Mission")
export class MissionController extends Controller {
  @SuccessResponse(StatusCodes.CREATED, "도전 미션 추가 성공")
  @Post("{missionId}/challenge")
  public async handleChallengeMission(@Path() missionId: number) {
    console.log("도전 미션 추가를 요청했습니다!");

    const userId = 1;

    // missionId 검증
    if (!missionId || Number.isNaN(missionId)) {
      throw new AppError(
        "유효하지 않은 missionId 입니다.",
        StatusCodes.BAD_REQUEST,
      );
    }

    // userId 검증
    if (!userId) {
      throw new AppError("사용자 정보가 없습니다.", StatusCodes.UNAUTHORIZED);
    }

    const mission = await createChallangeMission(userId, missionId);

    this.setStatus(StatusCodes.CREATED);

    return success(mission, "도전 미션이 추가되었습니다.", StatusCodes.CREATED);
  }

  @Get("stores/{storeId}/missions")
  public async handleGetMissions(
    @Path() storeId: number,
    @Query() cursor: number = 0,
    @Query() limit: number = 5,
  ) {
    console.log("미션 목록 조회를 요청했습니다!");

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

    const result = await getMissions(storeId, cursor, limit);

    return success(result, "미션 목록 조회를 성공했습니다.", StatusCodes.OK);
  }

  @Patch("{missionId}/complete")
  public async handleCompleteMission(@Path() missionId: number) {
    console.log("미션 완료를 요청했습니다!");

    const userId = 1;

    // userId 검증
    if (!userId) {
      throw new AppError("사용자 정보가 없습니다.", StatusCodes.UNAUTHORIZED);
    }

    // missionId 검증
    if (!missionId || Number.isNaN(missionId)) {
      throw new AppError(
        "유효하지 않은 missionId 입니다.",
        StatusCodes.BAD_REQUEST,
      );
    }

    const result = await completeUserMission(userId, missionId);

    return success(result, "미션이 완료 처리되었습니다.", StatusCodes.OK);
  }
}
