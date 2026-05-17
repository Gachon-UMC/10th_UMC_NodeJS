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
import { ApiResponse, ApiFailResponse } from "../../../common/responses/response.js";
import { ReviewListResponse,  } from "../dtos/review.dto.js";
import { AppError} from "../../../common/errors/app.error.js";

@Route("reviews") 
@Tags("Reviews")  

export class ReviewController extends Controller {

    
   /**
     * 특정 가게의 리뷰 목록 조회 API
     * @summary 가게 ID를 기반으로 작성된 리뷰들을 페이징 처리하여 조회합니다.
     * @param storeId 리뷰를 조회할 가게의 고유 식별자 ID
     * @param take 한 번에 가져올 리뷰의 개수 (기본값: 10개)
     * @param cursor 페이징 처리를 위한 마지막 리뷰의 ID (커서 방식)
     */

    @Get("stores/{storeId}")
    @Response<ApiResponse<ReviewListResponse>>(200, "특정 가게 리뷰 목록 조회 성공")
    @Response<ApiFailResponse>(400, "유효하지 않은 사용자 정보 에러")
    public async handleListStoreReviews(
        @Path() storeId: number,
        @Query() take: number = 10,
        @Query() cursor?: number
    ): Promise<ApiResponse<ReviewListResponse>> {
        if (!storeId || storeId <= 0) {
            throw new AppError({
                errorCode: "INVALID_REQUEST",
                message: "유효하지 않은 요청값입니다. 가게 ID를 확인해주세요.",
                statusCode: 400
            });
        }

       return await listStoreReviews(storeId, take, cursor);
    }

    /**
     * 내가 작성한 리뷰 목록 조회 API
     * @summary 현재 로그인한 유저 본인이 작성한 리뷰들을 페이징 처리하여 조회합니다.
     * @param take 한 번에 가져올 리뷰의 개수 (기본값: 10개)
     * @param cursor 페이징 처리를 위한 마지막 리뷰의 ID (커서 방식)
     */

    @Get("me")
    @Response<ApiResponse<ReviewListResponse>>(200, "내가 작성한 리뷰 목록 조회 성공")
    @Response<ApiFailResponse>(400, "유효하지 않은 사용자 정보 에러") 
    public async handleListUserReviews(
        @Query() take: number = 10,
        @Query() cursor?: number
    ): Promise<ApiResponse<ReviewListResponse>> {
        const userId = 1; // 임시 하드코딩
        
        if (!userId) {
            throw new AppError({
                errorCode: "INVALID_REQUEST",
                message: "유효하지 않은 요청값입니다. 사용자 정보가 없습니다.",
                statusCode: 400
            });
        }

        return await listUserReviews(userId, take, cursor);
    }
}