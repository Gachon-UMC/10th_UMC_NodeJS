import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { UserSignUpRequest } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { error } from "node:console";

export const handleUserSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  //서비스 로직 호출
  const user = await userSignUp(req.body as UserSignUpRequest);

  //성공 응답 보내기
  res.status(StatusCodes.OK).json({
    success: true,
    statusCode: StatusCodes.OK,
    message: "회원가입이 완료되었습니다.",
    data: user,
    error: null,
  });
};
