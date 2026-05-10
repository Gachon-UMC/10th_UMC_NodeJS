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
import { MissionListResponse, MissionActionResponse, MissionErrorResponse } from "../dtos/mission.dto.js";
@Route("missions") // 공통 경로
@Tags("Missions")  // Swagger 그룹화
export class MissionController extends Controller {

    /**
     * 나의 미션 목록 조회 (진행중/완료)
     */
    @Get("{storeId}/reviews")
    public async handleListMyMissions(
        
        @Query() status?: string,
        @Query() take: number = 10,
        @Query() cursor?: number
    ): Promise<MissionListResponse> {
        const userId = 1; // 실제로는 미들웨어나 커스텀 데코레이터로 주입

        // Enum 변환 로직
        const rawStatus = status?.toUpperCase();
        const statusType: MissionStatus = 
            rawStatus === "COMPLETE" ? MissionStatus.COMPLETE : MissionStatus.CHALLENGING;

        take = Math.min(take, 50);
        
        const data = await listMyMissions(userId, statusType, take, cursor);
        return {
            success: true,
            result: data
        };
    }

    /**
     * 미션 도전하기
     */
    @SuccessResponse(StatusCodes.CREATED, "Created")
    @Post("{missionId}/challenge")
    public async handleChallengeMission(
        @Path() missionId: number
    ): Promise<MissionActionResponse | MissionErrorResponse> {
        const userId = 1;

        try {
            const response = await challengeMission(userId, missionId);
            return response;
        } catch (error: any) {
            this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR);
            return {
                success: false,
                message: error.message || "이미 도전 중이거나 에러가 발생했습니다."
            };
        }
    }

    /**
     * 미션 완료 처리
     */
    @Patch("{memberMissionId}/complete")
    public async handleCompleteMission(
        @Path() memberMissionId: number
    ): Promise<MissionActionResponse | MissionErrorResponse> {
        try {
            const response = await completeMission(memberMissionId);
            return response;
        } catch (error: any) {
            this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR);
            return {
                success: false,
                message: error.message || "상태 변경 중 오류가 발생했습니다."
            };
        }
    }
}