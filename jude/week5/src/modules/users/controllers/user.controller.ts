import { type Request, type Response, type NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToUser, type UserSignUpRequest } from "../dtos/user.dto.js";
import { userSignUp,createStore,createReview, challengeMission } from "../services/user.service.js";

export const handleUserSignUp = async (req: Request, res: Response, next: NextFunction ) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
 
	//서비스 로직 호출 
  const user = await userSignUp(req.body as UserSignUpRequest);
  
  //성공 응답 보내기
  res.status(StatusCodes.OK).json({ result: user });
};

export const handleCreateStore = async (req: any, res: any) => {
  try {
    const data = await createStore(req.body);
    
    
    res.status(201).send({
      success: true,
      statusCode: 201,
      message: "가게 생성이 완료되었습니다.",
      data: data
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "가게 생성 중 오류가 발생했습니다."
    });
  }
};

export const handleCreateReview = async (req: any, res: any) => {
    try {
        const { storeId } = req.params; 
        const data = await createReview(Number(storeId), req.body);

        res.status(201).send({
            success: true,
            statusCode: 201,
            message: "리뷰 작성이 완료되었습니다.",
            data: data
        });
    } catch (err: any) {
        console.error(err);
       
        const status = err.message === "존재하지 않는 가게입니다." ? 404 : 500;
        res.status(status).send({
            success: false,
            statusCode: status,
            message: err.message
        });
    }
};

export const handleChallengeMission = async (req: any, res: any) => {
    try {
        const { missionId } = req.params;
        const data = await challengeMission(Number(missionId));

        res.status(201).send({
            success: true,
            statusCode: 201,
            message: "미션 도전이 시작되었습니다.",
            data: data
        });
    } catch (err: any) {
        console.error(err);
        const status = err.message === "이미 도전 중인 미션입니다." ? 400 : 500;
        res.status(status).send({
            success: false,
            statusCode: status,
            message: err.message
        });
    }
};