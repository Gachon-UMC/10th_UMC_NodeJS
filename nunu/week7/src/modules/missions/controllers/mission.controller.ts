import {
  Controller,
  Patch,
  Path,
  Post,
  Route,
  SuccessResponse,
  Tags,
} from "tsoa";
import { StatusCodes } from "http-status-codes";
import {
  completeUserMission,
  createChallangeMission,
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
