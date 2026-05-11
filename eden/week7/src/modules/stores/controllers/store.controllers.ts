import { StatusCodes } from "http-status-codes";
import { createStore } from "../services/store.services.js";
import { AddStoreRequestDTO } from "../dtos/store.dtos.js";
import { Body, Path, Post, Route, Tags, SuccessResponse } from "tsoa";
import { success } from "../../../common/responses/response.js";
import { AppError } from "../../../common/errors/app.error.js";


@Route("region")
@Tags("Stores")
export class StoreController {


@Post("{regionId}/stores")
  @SuccessResponse(StatusCodes.CREATED, "Created")
  public async addStore(
    @Path() regionId: number, 
    @Body() storeData: AddStoreRequestDTO 
  ) {
    if (!regionId || Number.isNaN(regionId)) {
      throw new AppError({
        errorCode: "INVALID_REGION_ID",
        message: "존재하지 않는 지역입니다.",
        statusCode: 400
      });
    }
  
    const newStore = await createStore(regionId, storeData);
    
   
    return success(newStore);
  }
}
