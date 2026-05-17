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
import { success } from "../../../common/responses.js";
import {
  InvalidMissionIdError,
  UnauthorizedUserError,
} from "../../../common/customError.js";

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
      throw new InvalidMissionIdError();
    }

    // userId 검증
    if (!userId) {
      throw new UnauthorizedUserError();
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
      throw new UnauthorizedUserError();
    }

    // missionId 검증
    if (!missionId || Number.isNaN(missionId)) {
      throw new InvalidMissionIdError();
    }

    const result = await completeUserMission(userId, missionId);

    return success(result, "미션이 완료 처리되었습니다.", StatusCodes.OK);
  }
}
