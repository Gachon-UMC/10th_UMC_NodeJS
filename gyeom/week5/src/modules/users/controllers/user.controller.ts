import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp, userMissionAdd } from "../services/user.service.js";
import { UserSignUpRequest, UserMissionAddRequest } from "../dtos/user.dto.js";

export const handleUserSignUp = async (req: Request, res: Response, next: NextFunction ) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
 
	//서비스 로직 호출 
  const user = await userSignUp(req.body as UserSignUpRequest);

  
  
  //성공 응답 보내기
  res.status(StatusCodes.OK).json({ result: user });
};

export const handleAddUserMission = async (req: Request, res: Response) => {
  console.log("미션 도전 요청");
  console.log("body:", req.body);

  try {
    const userId = Number(req.params.userId);
    const userMission = await userMissionAdd(userId, req.body as UserMissionAddRequest);
    res.status(StatusCodes.OK).json({ result: userMission });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: (err as Error).message });
  }
};