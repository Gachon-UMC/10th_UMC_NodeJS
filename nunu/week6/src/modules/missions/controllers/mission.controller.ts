import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  completeUserMission,
  createChallangeMission,
  getMissions,
} from "../services/mission.service.js";

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
    if (!missionId || Number.isNaN(missionId)) {
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

    const mission = await createChallangeMission(userId, missionId);

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

export const handleGetMissions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const storeId = Number(req.params.storeId);

    // storeId 검증
    if (!req.params.storeId || Number.isNaN(storeId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: "유효하지 않은 storeId 입니다.",
        data: null,
      });
    }

    const cursor = Number(req.query.cursor ?? 0);
    const limit = Number(req.query.limit ?? 5);

    // cursor, limit 검증
    if (Number.isNaN(cursor) || Number.isNaN(limit) || limit < 1) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: "유효하지 않은 cursor 또는 limit 입니다.",
        data: null,
      });
    }

    const result = await getMissions(storeId, cursor, limit);

    return res.status(StatusCodes.OK).json({
      success: true,
      statusCode: StatusCodes.OK,
      message: "미션 목록 조회를 성공했습니다.",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const handleCompleteMission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = 1; // 임시 userId
    const missionId = Number(req.params.missionId);

    console.log(userId, missionId);

    // userId 검증
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        statusCode: StatusCodes.UNAUTHORIZED,
        message: "사용자 정보가 없습니다.",
        data: null,
      });
    }

    if (!missionId || Number.isNaN(missionId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        StatusCodes: StatusCodes.BAD_REQUEST,
        message: "유효하지 않은 missionId 입니다.",
        data: null,
      });
    }

    const result = await completeUserMission(userId, missionId);

    return res.status(StatusCodes.OK).json({
      success: true,
      statusCode: StatusCodes.OK,
      message: "미션이 완료 처리되었습니다.",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
