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
    
    
<<<<<<< Updated upstream
    res.status(201).send({
      success: true,
      statusCode: 201,
      message: "가게 생성이 완료되었습니다.",
      data: data
    });
=======
  return res.status(StatusCodes.CREATED).send({
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "가게 생성이 완료되었습니다.",
      data,
 });

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        const { storeId } = req.params; 
        const data = await createReview(Number(storeId), req.body);

        res.status(201).send({
=======
        const userId = 1;
        const { storeId } = req.params; 

        if (!req.params.storeId || Number.isNaN(storeId)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: "유효하지 않은 storeId 입니다.",
        data: null,
        });
      }
        const data = await createReview(userId, Number(storeId), req.body);

        return res.status(StatusCodes.CREATED).send({
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
export const handleChallengeMission = async (req: any, res: any) => {
    try {
        const { missionId } = req.params;
        const data = await challengeMission(Number(missionId));

        res.status(201).send({
=======
export const handleChallengeMission = async (req: Request,res: Response) => {
    try {
        const userId = 1;
        const { missionId } = req.params;
        

        if (!req.params.missionId || Number.isNaN(missionId)) {
        
        return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: "유효하지 않은 missionId 입니다.",
        data: null,
    });
}
        const data = await challengeMission(userId, Number(missionId));

        return res.status(201).send({
>>>>>>> Stashed changes
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