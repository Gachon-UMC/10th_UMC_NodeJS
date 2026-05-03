import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { missionAdd } from "../service/mission.service.js";
import { MissionAddRequest } from "../dto/mission.dto.js";

export const handleAddMission = async (req: Request, res: Response) => {
  console.log("미션 추가 요청");
  console.log("body:", req.body);

  try {
    const storeId = Number(req.params.storeId);
    if (!req.params.storeId || Number.isNaN(storeId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: "유효하지 않은 storeId 입니다.",
        data: null,
      });
    }
    const body: MissionAddRequest = req.body;
    const mission = await missionAdd(storeId, body);
    return res.status(StatusCodes.OK).json({
      success: true,
      statusCode: StatusCodes.OK,
      message: "미션 추가 성공",
      data: mission,
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