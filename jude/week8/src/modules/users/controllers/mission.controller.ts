import { 
    Controller, 
    Get, 
    Post, 
    Patch, 
    Route, 
    Tags, 
    Query, 
    Path, 
    SuccessResponse, 
    Response,
    Body
} from "tsoa";
import { StatusCodes } from "http-status-codes";
import { listMyMissions, challengeMission, completeMission } from "../services/mission.service.js";
import { MissionStatus } from "../../../generated/prisma/enums.js";
import { MissionListResponse, MissionActionResponse,  } from "../dtos/mission.dto.js";
import { ApiResponse,ApiFailResponse } from "../../../common/responses/response.js";
import { AppError} from "../../../common/errors/app.error.js";

@Route("missions") 
@Tags("Missions")  
export class MissionController extends Controller {

    /**
     * 내가 진행 중이거나 완료한 미션 목록 조회 API
     * @summary 인증 정보를 기반으로 유저의 미션 목록을 필터링(진행중/완료)하여 조회합니다.
     * @param status 미션 상태 필터 ("CHALLENGING" 또는 "COMPLETE")
     * @param take 한 번에 가져올 미션의 개수 (기본값: 10개)
     * @param cursor 페이징 처리를 위한 마지막 멤버 미션 ID (커서 방식)
     */
    @Get("my-list")
    @Response<ApiResponse<MissionListResponse>>(200, "내 미션 목록 조회 성공")
    @Response<ApiFailResponse>(400, "유효하지 않은 사용자 정보 에러")
    public async handleListMyMissions(
        
        @Query() status?: string,
        @Query() take: number = 10,
        @Query() cursor?: number
    ): Promise<ApiResponse<MissionListResponse>>{
        const userId = 1; 

        if (!userId) {
        throw new AppError({
            errorCode: "INVALID_REQUEST",
            message: "유효하지 않은 요청값입니다. 사용자 정보가 없습니다.",
            statusCode: 400
        });
    }

    const rawStatus = status?.toUpperCase();
    const statusType: MissionStatus = 
        rawStatus === "COMPLETE" ? MissionStatus.COMPLETE : MissionStatus.CHALLENGING;

    
    
    const data = await listMyMissions(userId, statusType, take, cursor);
    
    return data;
    }

    /**
     * 미션 도전하기 API
     * @summary 특정 미션을 유저의 도전 중인 미션 목록에 추가합니다.
     * @param missionId 도전할 미션의 고유 식별자 ID
     */
    @SuccessResponse(StatusCodes.CREATED, "Created")
    @Post("{missionId}/challenge")
    @Response<ApiResponse<MissionActionResponse>>(200, "미션 도전 성공")
    @Response<ApiFailResponse>(400, "유효하지 않은 미션 ID 또는 이미 도전 중인 미션 에러")
    public async handleChallengeMission(
        @Path() missionId: number
    ): Promise<ApiResponse<MissionActionResponse>> {
    const userId = 1; // 임시 유저 ID


    if (!missionId || missionId <= 0) {
        throw new AppError({
            errorCode: "INVALID_REQUEST",
            message: "유효하지 않은 요청값입니다. 미션 ID를 확인해주세요.",
            statusCode: 400
        });
    }


    const result = await challengeMission(userId, missionId);
    
    return result;
}

   /**
     * 미션 완료 처리 API
     * @summary 유저가 도전 중인 미션을 완료 상태로 변경합니다.
     * @param memberMissionId 유저가 도전 중인 미션의 매핑 테이블 고유 ID (성공 시 리턴받았던 ID)
     */
    @Patch("{memberMissionId}/complete")
    @Response<ApiResponse<MissionActionResponse>>(200, "미션 완료 성공")
    @Response<ApiFailResponse>(400, "유효하지 않은 사용자 미션 ID 에러")
    public async handleCompleteMission(
        @Path() memberMissionId: number
    ): Promise<ApiResponse<MissionActionResponse>> {
    
   
    if (!memberMissionId || memberMissionId <= 0) {
        throw new AppError({
            errorCode: "INVALID_REQUEST",
            message: "유효하지 않은 요청값입니다. 사용자 미션 ID를 확인해주세요.",
            statusCode: 400
        });
    }

    const result = await completeMission(memberMissionId);
    

    return result;
    }
}