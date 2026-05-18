import {
  Body,
  Controller,
  Patch,
  Path,
  Route,
  Tags,
  Response,
} from "tsoa";

import { success, ApiResponse } from "../../../common/responses/response.js";
import { challengeMission } from "../services/mission.service.js";
import { ChallengeMissionRequest } from "../dtos/mission.dto.js";

@Route("users/missions")
@Tags("Missions")
export class MissionController extends Controller {
  /**
   * 미션 도전 API
   * @summary 사용자가 특정 미션에 도전합니다.
   */
  @Patch("{missionId}")
  @Response<ApiResponse<null>>(200, "미션 도전 성공")
  @Response<ApiResponse<null>>(404, "미션을 찾을 수 없음")
  @Response<ApiResponse<null>>(409, "이미 도전 중인 미션")
  public async handleChallengeMission(
    @Path() missionId: number,
    @Body() body: ChallengeMissionRequest
  ) {
    await challengeMission(missionId, body);

    return success({
      message: "미션 도전 완료",
    });
  }
}