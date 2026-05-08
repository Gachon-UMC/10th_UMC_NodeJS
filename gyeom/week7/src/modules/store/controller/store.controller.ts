import { Body, Controller, Post, Route, Tags } from "tsoa";
import { StoreAddRequest, StoreAddResponse } from "../dto/store.dto.js";
import { storeAdd } from "../service/store.service.js";
import { AppError } from "../../../common/errors/app.error.js";
import { ApiResponse, success } from "../../../common/responses/response.js";
import { StatusCodes } from "http-status-codes";

@Route("stores")
@Tags("Stores")
export class StoreController extends Controller {
  @Post("/")
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