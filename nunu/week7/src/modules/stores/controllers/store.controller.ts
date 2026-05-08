import { Body, Controller, Post, Route, SuccessResponse, Tags } from "tsoa";
import { StatusCodes } from "http-status-codes";
import { createStore } from "../services/store.service.js";
import { CreateStoreRequest } from "../dtos/store.dto.js";
import { success } from "../../../common/responses.js";
import { AppError } from "../../../common/errors.js";

@Route("stores")
@Tags("Store")
export class StoreController extends Controller {
  @SuccessResponse(StatusCodes.CREATED, "가게 생성 성공")
  @Post("/")
  public async handleCreateStore(@Body() data: CreateStoreRequest) {
    console.log("가게 생성을 요청했습니다!");
    console.log("body:", data);

    const { name, storeType, regionId } = data;

    // 필수값 검증
    if (!name || !storeType || regionId === undefined) {
      throw new AppError("필수값이 누락되었습니다.", StatusCodes.BAD_REQUEST);
    }

    const store = await createStore({
      name,
      storeType,
      regionId,
    });

    this.setStatus(StatusCodes.CREATED);

    return success(store, "가게 생성이 완료되었습니다.", StatusCodes.CREATED);
  }
}
