import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
  Tags,
} from "tsoa";
import { StatusCodes } from "http-status-codes";
import { createStore, getMissions } from "../services/store.service.js";
import { CreateStoreRequest } from "../dtos/store.dto.js";
import { success } from "../../../common/responses.js";
import { AppError } from "../../../common/errors.js";
import {
  InvalidPaginationQueryError,
  InvalidStoreIdError,
  MissingReviewFieldError,
} from "../../../common/customError.js";

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
      throw new MissingReviewFieldError();
    }

    const store = await createStore({
      name,
      storeType,
      regionId,
    });

    this.setStatus(StatusCodes.CREATED);

    return success(store, "가게 생성이 완료되었습니다.", StatusCodes.CREATED);
  }

  @Get("{storeId}/missions")
  public async handleGetMissions(
    @Path() storeId: number,
    @Query() cursor: number = 0,
    @Query() limit: number = 5,
  ) {
    console.log("미션 목록 조회를 요청했습니다!");

    // storeId 검증
    if (!storeId || Number.isNaN(storeId)) {
      throw new InvalidStoreIdError();
    }

    // cursor, limit 검증
    if (Number.isNaN(cursor) || Number.isNaN(limit) || limit < 1) {
      throw new InvalidPaginationQueryError();
    }

    const result = await getMissions(storeId, cursor, limit);

    return success(result, "미션 목록 조회를 성공했습니다.", StatusCodes.OK);
  }
}
