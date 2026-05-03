import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { storeAdd } from "../service/store.service.js";
import { StoreAddRequest } from "../dto/store.dto.js";

export const handleAddStore = async (req: Request, res: Response) => {
  console.log("가게 추가 요청");
  console.log("body:", req.body);

  try {
    const body: StoreAddRequest = req.body;
    const store = await storeAdd(body);
    return res.status(StatusCodes.OK).json({
      success: true,
      statusCode: StatusCodes.OK,
      message: "가게 추가 성공",
      data: store,
    });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      statusCode: StatusCodes.BAD_REQUEST,
      message: (err as Error).message,
      data: null,
    });
  }
};