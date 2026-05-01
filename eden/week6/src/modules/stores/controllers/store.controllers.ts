import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { createStore } from "../services/store.services.js";
import { AddStoreRequestDTO } from "../dtos/store.dtos.js";


export const handleAddStore = async (req: Request, res: Response, next: NextFunction) => {
 
const { regionId: rawRegionId } = req.params;

if (typeof rawRegionId !== 'string') {
  // regionId가 없거나 이상한 형태일 때 에러 처리
  return res.status(400).json({ message: "유효하지 않은 지역 ID입니다." });
}

const regionId = parseInt(rawRegionId, 10);
  // 요청 본문(body)에서 가게 이름과 카테고리를 가져옵니다.
  const storeData: AddStoreRequestDTO = req.body;

  console.log(`'${regionId}' 지역에 가게 추가를 요청했습니다.`);
  console.log("body:", storeData);

  try {
    const newStore = await createStore(regionId, storeData);
   
    return res.status(StatusCodes.CREATED).json({ result : newStore });
  } catch (err) {
    next(err); // 에러가 발생하면 다음 미들웨어로 전달
  }
};


