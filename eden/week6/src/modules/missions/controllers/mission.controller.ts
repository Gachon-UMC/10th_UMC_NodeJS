import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { createMission, listStoreMissions, listUserMissions, startMissionChallenge } from "../services/mission.service";
import { AddMissionRequestDTO, ListStoreMissionsRequestParams } from "../dtos/mission.dto";

export const handleAddMission = async (req: Request, res: Response, next: NextFunction) => {
  const { storeId: rawStoreId } = req.params;

  if (typeof rawStoreId !== 'string') {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "유효하지 않은 가게 ID입니다." });
  }
  const storeId = parseInt(rawStoreId, 10);

  const missionData:AddMissionRequestDTO = req.body;

  try {
    const result = await createMission(storeId, missionData);
    return res.status(StatusCodes.CREATED).json({ result });
  } catch (err) {
    next(err);
  }
};

// 특정 가게의 미션 목록 조회 컨트롤러
export const handleListStoreMissions = async (req: Request, res: Response) => {
    try {
        const storeIdString = req.params.storeId as string;

        // 파라미터 유효성 검사 
        const storeId = parseInt(storeIdString, 10);
        if (isNaN(storeId)) {
            return res.status(400).send("유효한 숫자 형태의 storeId가 필요합니다.");
        }

        // 서비스 호출
        const missions = await listStoreMissions(storeId);

        // 성공 응답 전송
        return res.status(200).json(missions);

    } catch (error) {
        console.error("가게 미션 목록 조회 중 오류 발생:", error);
        return res.status(500).send("서버 내부 오류가 발생했습니다.");
    }
}
// 진행중인 미션 조회 컨트롤러
export const handleListUserMissions= async(req:Request, res:Response) => {
  try{
    const userIdString=req.params.userId as string;
    //파라미터 유효성검사
    const userId=parseInt(userIdString,10);
    if(isNaN(userId)){
      return res.status(400).send("유효한 숫자 형태의 userId가 필요합니다.");
    }
    //서비스 호출
    const missions=await listUserMissions(userId);
    //성공 응답 전송
    return res.status(200).json(missions);
  } catch (error) {
        console.error("진행중인 미션 목록 조회 중 오류 발생:", error);
        return res.status(500).send("서버 내부 오류가 발생했습니다.");
    }
}
export const handleChallengeMission = async (req: Request, res: Response, next: NextFunction) => {
  const { userId: rawUserId, missionId: rawMissionId } = req.params;

  if (typeof rawUserId !== 'string' || typeof rawMissionId !== 'string') {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "유효하지 않은 사용자 또는 미션 ID입니다." });
  }

  const userId = parseInt(rawUserId, 10);
  const missionId = parseInt(rawMissionId, 10);

  try {
    const result = await startMissionChallenge(userId, missionId);
    return res.status(StatusCodes.CREATED).json({ result });
  } catch (err: any) {
    
    if (err.statusCode === 409) {
      return res.status(StatusCodes.CONFLICT).json({ message: err.message });
    }
    next(err); 
  }
};
