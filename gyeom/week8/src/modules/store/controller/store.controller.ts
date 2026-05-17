import { Body, Controller, Post, Route, Tags, Response } from "tsoa";
import { StoreAddRequest, StoreAddResponse, StoreAddApiResponse } from "../dto/store.dto.js";
import { storeAdd } from "../service/store.service.js";
import { AppError } from "../../../common/errors/app.error.js";
import { ApiResponse, success } from "../../../common/responses/response.js";
import { StatusCodes } from "http-status-codes";

@Route("stores")
@Tags("Stores")
export class StoreController extends Controller {
  /**
   * 가게 추가 API
   * @summary 특정 지역에 가게를 추가하는 엔드포인트입니다.
   */
  @Post("/")
  @Response<StoreAddApiResponse>(200, "가게 추가 성공", {
    success: true,
    statusCode: 200,
    message: "가게 추가 성공",
    data: { id: 1, name: "맛있는 한식당", regionId: 1 },
  })
  @Response<StoreAddApiResponse>(500, "서버 내부 오류", {
    success: false,
    statusCode: 500,
    message: "서버 내부 오류",
    data: null,
  })
  public async handleAddStore(
    @Body() body: StoreAddRequest,
  ): Promise<ApiResponse<StoreAddResponse>> {
    try {
      const store = await storeAdd(body);
      return success(StatusCodes.OK, "가게 추가 성공", store);
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