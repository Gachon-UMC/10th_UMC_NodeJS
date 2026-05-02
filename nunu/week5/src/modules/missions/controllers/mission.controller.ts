import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { createUserMission } from "../services/mission.service.js";

export const handleChallengeMission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("도전 미션 추가를 요청했습니다!");

    const userId = 1; // 첫 번째 유저로 고정 (인증 기능이 없으므로)

    const missionId = Number(req.params.missionId);

    // missionId 검증
    if (!req.params.missionId || Number.isNaN(missionId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: "유효하지 않은 missionId 입니다.",
        data: null,
      });
    }

    // userId 검증
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        statusCode: StatusCodes.UNAUTHORIZED,
        message: "사용자 정보가 없습니다.",
        data: null,
      });
    }

    const mission = await createUserMission(userId, missionId);

    res.status(StatusCodes.CREATED).json({
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "도전 미션이 추가되었습니다.",
      data: mission,
    });
  } catch (err) {
    next(err);
  }
};
