import { 
    Controller, 
    Get, 
    Route, 
    Tags, 
    Query, 
    Path, 
    Response 
} from "tsoa";
import { StatusCodes } from "http-status-codes";
import { listStoreReviews, listUserReviews } from "../services/review.service.js";
import { ReviewListResponse } from "../dtos/review.dto.js";
@Route("reviews") // 공통 경로 설정
@Tags("Reviews")  // Swagger 그룹화
export class ReviewController extends Controller {

    /**
     * 특정 가게의 리뷰 목록 조회
     * @param storeId 가게 ID
     * @param take 가져올 리뷰 개수 (기본 10, 최대 50)
     * @param cursor 페이징을 위한 커서 (마지막 리뷰 ID)
     */
    @Get("stores/{storeId}")
    public async handleListStoreReviews(
        @Path() storeId: number,
        @Query() take: number = 10,
        @Query() cursor?: number
    ): Promise<any> {
        
        take = Math.min(take, 50);

        const reviews = await listStoreReviews(storeId, take, cursor);

        return {
            success: true,
            result: reviews
        };
    }

    /**
     * 내가 작성한 리뷰 목록 조회
     * @param take 가져올 리뷰 개수 (기본 10, 최대 50)
     * @param cursor 페이징을 위한 커서 (마지막 리뷰 ID)
     */
    @Get("reviews/me")
    public async handleListUserReviews(
        @Query() take: number = 10,
        @Query() cursor?: number
    ): Promise<any> {
        const userId = 1; // 실제로는 인증 미들웨어에서 가져옴
        
        take = Math.min(take, 50);

        try {
            const data = await listUserReviews(userId, take, cursor);
            
            return {
                success: true,
                result: data
            };
        } catch (error: any) {
            this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR);
            return {
                success: false,
                message: error.message || "리뷰 목록을 불러오는 중 오류가 발생했습니다."
            };
        }
    }
}