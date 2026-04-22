import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { createUserMission } from "../services/mission.service.js";

export const handleCreateUserMission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("도전 미션 추가를 요청했습니다!");

    const missionId = Number(req.params.missionId);

    const review = await createUserMission(missionId);

    res.status(StatusCodes.CREATED).json({
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "도전 미션이 추가되었습니다.",
      data: review,
    });
  } catch (err) {
    next(err);
  }
};
