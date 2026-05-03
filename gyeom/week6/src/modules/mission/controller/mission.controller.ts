import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { missionAdd, missionList } from "../service/mission.service.js";
import { MissionAddRequest } from "../dto/mission.dto.js";

export const handleAddMission = async (req: Request, res: Response) => {
  console.log("미션 추가 요청");
  console.log("body:", req.body);

  const storeId = Number(req.params.storeId);
  const mission = await missionAdd(storeId, req.body as MissionAddRequest);
  res.status(StatusCodes.OK).json({ result: mission });
};

export const handleGetStoreMissions = async (req: Request, res: Response) => {
  console.log("가게 미션 목록 조회 요청");

  try {
    const storeId = Number(req.params.storeId);
    const missions = await missionList(storeId);
    res.status(StatusCodes.OK).json({ result: missions });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: (err as Error).message });
  }
};