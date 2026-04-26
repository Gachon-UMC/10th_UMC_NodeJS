import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { missionAdd } from "../service/mission.service.js";
import { MissionAddRequest } from "../dto/mission.dto.js";

export const handleAddMission = async (req: Request, res: Response) => {
  console.log("미션 추가 요청");
  console.log("body:", req.body);

  const storeId = Number(req.params.storeId);
  const mission = await missionAdd(storeId, req.body as MissionAddRequest);
  res.status(StatusCodes.OK).json({ result: mission });
};