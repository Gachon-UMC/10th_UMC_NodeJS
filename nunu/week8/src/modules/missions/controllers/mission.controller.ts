import {
  Controller,
  Patch,
  Path,
  Post,
  Route,
  SuccessResponse,
  Response,
  Tags,
  Example,
} from "tsoa";
import { StatusCodes } from "http-status-codes";
import {
  completeUserMission,
  createChallangeMission,
} from "../services/mission.service.js";
import {
  ErrorResponse,
  success,
  SuccessResponseType,
} from "../../../common/responses.js";
import {
  InvalidMissionIdError,
  UnauthorizedUserError,
} from "../../../common/customError.js";
import {
  CompleteUserMissionResponse,
  UserMissionResponse,
} from "../dtos/mission.dto.js";

@Route("missions")
@Tags("Mission")
export class MissionController extends Controller {
  @SuccessResponse(StatusCodes.CREATED, "도전 미션 추가 성공")
  @Response<ErrorResponse>(StatusCodes.BAD_REQUEST, "잘못된 요청", {
    success: false,
    statusCode: 400,
    message: "잘못된 요청입니다.",
    data: null,
  })
  @Response<ErrorResponse>(StatusCodes.UNAUTHORIZED, "인증 실패", {
    success: false,
    statusCode: 401,
    message: "사용자 정보가 없습니다.",
    data: null,
  })
  @Response<ErrorResponse>(StatusCodes.CONFLICT, "이미 도전 중인 미션", {
    success: false,
    statusCode: 409,
    message: "이미 도전 중인 미션입니다.",
    data: null,
  })
  @Response<ErrorResponse>(StatusCodes.NOT_FOUND, "미션 없음", {
    success: false,
    statusCode: 404,
    message: "존재하지 않는 미션입니다.",
    data: null,
  })
  @Response<ErrorResponse>(StatusCodes.INTERNAL_SERVER_ERROR, "서버 오류", {
    success: false,
    statusCode: 500,
    message: "서버 오류가 발생했습니다.",
    data: null,
  })

  /**
   * @summary 도전 미션 추가 API
   * @description 특정 미션을 사용자 도전 목록에 추가합니다.
   *
   * - 이미 도전 중인 미션은 추가할 수 없습니다.
   * - 존재하지 않는 미션은 추가할 수 없습니다.
   *
   * @param missionId 도전할 미션의 고유 ID
   */
  @Post("{missionId}/challenge")
  @Example<SuccessResponseType<UserMissionResponse>>({
    success: true,
    statusCode: 201,
    message: "도전 미션이 추가되었습니다.",
    data: {
      id: 1,
      createdAt: "2026-05-17T13:38:08.264Z",
      updatedAt: "2026-05-17T13:38:08.264Z",
    },
  })
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

  @SuccessResponse(StatusCodes.OK, "미션 완료 처리 성공")
  @Response<ErrorResponse>(StatusCodes.BAD_REQUEST, "잘못된 요청", {
    success: false,
    statusCode: 400,
    message: "잘못된 요청입니다.",
    data: null,
  })
  @Response<ErrorResponse>(StatusCodes.UNAUTHORIZED, "인증 실패", {
    success: false,
    statusCode: 401,
    message: "사용자 정보가 없습니다.",
    data: null,
  })
  @Response<ErrorResponse>(StatusCodes.NOT_FOUND, "도전 기록 없음", {
    success: false,
    statusCode: 404,
    message: "해당 미션을 도전한 기록이 없습니다.",
    data: null,
  })
  @Response<ErrorResponse>(StatusCodes.CONFLICT, "이미 완료된 미션", {
    success: false,
    statusCode: 409,
    message: "이미 완료된 미션입니다.",
    data: null,
  })
  @Response<ErrorResponse>(StatusCodes.INTERNAL_SERVER_ERROR, "서버 오류", {
    success: false,
    statusCode: 500,
    message: "서버 오류가 발생했습니다.",
    data: null,
  })

  /**
   * @summary 미션 완료 처리 API
   * @description 사용자가 도전 중인 미션을 완료 상태로 변경합니다.
   *
   * - 도전 기록이 존재해야 합니다.
   * - 이미 완료된 미션은 다시 완료 처리할 수 없습니다.
   *
   * @param missionId 완료 처리할 미션의 고유 ID
   */
  @Patch("{missionId}/complete")
  @Example<SuccessResponseType<CompleteUserMissionResponse>>({
    success: true,
    statusCode: 200,
    message: "미션이 완료 처리되었습니다.",
    data: {
      missionId: 1,
      isCompleted: true,
    },
  })
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
