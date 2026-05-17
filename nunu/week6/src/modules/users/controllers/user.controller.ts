import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { UserSignUpRequest } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", req.body);

    const data = req.body as UserSignUpRequest;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 이메일 형식 검사
    if (!emailRegex.test(data.email)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: "올바르지 않은 이메일 형식입니다.",
        data: null,
      });
    }

    // 비밀번호 형식 검사
    if (!data.password || data.password.length < 6) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: "비밀번호는 6자 이상이어야 합니다.",
        data: null,
      });
    }

    // preferences 존재 여부
    if (!data.preferences || data.preferences.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: "선호 카테고리를 최소 1개 선택해야 합니다.",
        data: null,
      });
    }

    const user = await userSignUp(data);

    res.status(StatusCodes.CREATED).json({
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "회원가입이 완료되었습니다.",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
