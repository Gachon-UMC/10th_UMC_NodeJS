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

    const user = await userSignUp(req.body as UserSignUpRequest);

    res.status(StatusCodes.OK).json({
      success: true,
      statusCode: StatusCodes.OK,
      message: "회원가입이 완료되었습니다.",
      data: user,
    });
  } catch (err) {
    next(err); // 🔥 이게 핵심
  }
};
