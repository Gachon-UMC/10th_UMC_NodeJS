import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { StoreRequest } from "../dtos/store.dto.js";
import { createStore } from "../services/store.service.js";

export const handleCreateStore = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("가게 생성을 요청했습니다!");
    console.log("body:", req.body);

    const user = await createStore(req.body as StoreRequest);

    res.status(StatusCodes.CREATED).json({
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "가게 생성이 완료되었습니다.",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
