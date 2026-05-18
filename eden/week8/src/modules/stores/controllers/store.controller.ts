import { StatusCodes } from "http-status-codes";
import { createStore } from "../services/store.services.js";
import { AddStoreRequestDTO, StoreResponseDTO } from "../dtos/store.dtos.js";
import { Body, Path, Post, Route, Tags, SuccessResponse } from "tsoa";
import { ApiResponse, StoreErrorResponse, success } from "../../../common/responses/response.js";
import { Response } from "tsoa"; 




@Route("stores")
@Tags("Stores")
export class StoreController {
  /**
   * 가게생성 API
   * @summary 가게를 만드는 엔드포인트입니다.
   */

@Post("{regionId}")
  @SuccessResponse(StatusCodes.CREATED, "Created")
   @Response<StoreErrorResponse>(422, "잘못된 요청(유효성 검증 실패")
  @Response<StoreErrorResponse>(409, "이미 존재하는 가게입니다")
  @Response<StoreErrorResponse>(500, "서버 내부 오류")
  public async addStore(
    @Path() regionId: number, 
    @Body() storeData: AddStoreRequestDTO 
  ):Promise<ApiResponse<StoreResponseDTO >> {
  
    const newStore = await createStore(regionId, storeData);
    
   
    return success(newStore);
  }
}
