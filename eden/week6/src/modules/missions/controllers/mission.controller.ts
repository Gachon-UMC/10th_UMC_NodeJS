import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { createMission } from "../services/mission.service";
import { AddMissionRequestDTO } from "../dtos/mission.dto";

export const handleAddMission = async (req: Request, res: Response, next: NextFunction) => {
  const { storeId: rawStoreId } = req.params;

  if (typeof rawStoreId !== 'string') {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "유효하지 않은 가게 ID입니다." });
  }
  const storeId = parseInt(rawStoreId, 10);

  const missionData:AddMissionRequestDTO = req.body;

  try {
    const result = await createMission(storeId, missionData);
    return res.status(StatusCodes.CREATED).json({ result });
  } catch (err) {
    next(err);
  }
};