import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { userSignUp, userMissionAdd } from "../services/user.service.js";
import { UserSignUpRequest, UserMissionAddRequest } from "../dtos/user.dto.js";

export const handleUserSignUp = async (req: Request, res: Response, next: NextFunction) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body);

  try {
    const body: UserSignUpRequest = req.body;
    const user = await userSignUp(body);
    return res.status(StatusCodes.OK).json({
      success: true,
      statusCode: StatusCodes.OK,
      message: "회원가입 성공",
      data: user,
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