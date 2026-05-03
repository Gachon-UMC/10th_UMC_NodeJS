import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { userMissionAdd, userMissionList, userMissionComplete } from "../services/user.service.js";
import { UserMissionAddRequest } from "../dtos/user.dto.js";

// export const handleUserSignUp = async (req: Request, res: Response, next: NextFunction ) => {
//   console.log("회원가입을 요청했습니다!");
//   console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
//   const user = await userSignUp(req.body as UserSignUpRequest);
//   res.status(StatusCodes.OK).json({ result: user });
// };

export const handleAddUserMission = async (req: Request, res: Response) => {
  console.log("미션 도전 요청");
  console.log("body:", req.body);

  try {
    const userId = Number(req.params.userId);
    if (!req.params.userId || Number.isNaN(userId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: "유효하지 않은 userId 입니다.",
        data: null,
      });
    }
    const body: UserMissionAddRequest = req.body;
    const userMission = await userMissionAdd(userId, body);
    return res.status(StatusCodes.OK).json({
      success: true,
      statusCode: StatusCodes.OK,
      message: "미션 도전 성공",
      data: userMission,
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

export const handleGetUserMissions = async (req: Request, res: Response) => {
  console.log("진행 중인 미션 목록 조회 요청");

  try {
    const userId = Number(req.params.userId);
    if (!req.params.userId || Number.isNaN(userId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: "유효하지 않은 userId 입니다.",
        data: null,
      });
    }
    const userMissions = await userMissionList(userId);
    return res.status(StatusCodes.OK).json({
      success: true,
      statusCode: StatusCodes.OK,
      message: "미션 목록 조회 성공",
      data: userMissions,
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

export const handleCompleteUserMission = async (req: Request, res: Response) => {
  console.log("미션 완료 요청");

  try {
    const userId = Number(req.params.userId);
    const missionId = Number(req.params.missionId);
    if (Number.isNaN(userId) || Number.isNaN(missionId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: "유효하지 않은 요청입니다.",
        data: null,
      });
    }
    const result = await userMissionComplete(userId, missionId);
    return res.status(StatusCodes.OK).json({
      success: true,
      statusCode: StatusCodes.OK,
      message: "미션 완료 성공",
      data: result,
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
