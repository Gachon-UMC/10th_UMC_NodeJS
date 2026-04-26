import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { storeAdd } from "../service/store.service";
import { responseFromStore, StoreAddRequest , bodyToStore} from "../dto/store.dto.js";
export const handleAddStore = async (req: Request, res: Response) => {
  console.log("가게 추가 요청");
  console.log("body:", req.body);
  const store = await storeAdd(req.body as StoreAddRequest);
  res.status(StatusCodes.OK).json({ result: store });
};