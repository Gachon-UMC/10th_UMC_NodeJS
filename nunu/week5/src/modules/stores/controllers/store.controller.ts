import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { createStore } from "../services/store.service.js";
import { CreateStoreRequest } from "../dtos/store.dto.js";

export const handleCreateStore = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("가게 생성을 요청했습니다!");
    console.log("body:", req.body);

    const { name, storeType, regionId } = req.body as CreateStoreRequest;

    // 필수값 검증
    if (!name || !storeType || regionId === undefined) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: "필수값이 누락되었습니다.",
        data: null,
      });
    }

    const store = await createStore({
      name,
      storeType,
      regionId,
    });

    res.status(StatusCodes.CREATED).json({
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "가게 생성이 완료되었습니다.",
      data: store,
    });
  } catch (err) {
    next(err);
  }
};
