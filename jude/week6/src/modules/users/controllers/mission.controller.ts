import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { listMyMissions } from "../services/mission.service.js";
import { challengeMission } from "../../users/services/mission.service.js";

export const handleListMyMissions = async (req: Request, res: Response) => {
    const userId = 1; 
    // URL 예시: /api/v1/users/missions?status=complete (진행완료)
    // URL 예시: /api/v1/users/missions?status=challenging (진행중)
    const statusType = (req.query.status as string) || "challenging";
    const cursor = req.query.cursor ? Number(req.query.cursor) : undefined;

    try {
        const data = await listMyMissions(userId, statusType, cursor);
        
        return res.status(StatusCodes.OK).json({
            success: true,
            result: data
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "미션 목록을 가져오는 중 에러가 발생했습니다."
        });
    }
};

export const handleChallengeMission = async (req: Request, res: Response) => {
    const userId = 1; // 실제로는 인증 정보에서 가져옴
    const { missionId } = req.params; // URL의 :missionId 값

    try {
        const data = await challengeMission(userId, Number(missionId));
        
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "미션 도전을 시작했습니다.",
            result: data
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "이미 도전 중이거나 에러가 발생했습니다."
        });
    }
};

// src/modules/users/controllers/mission.controller.ts
import { completeMission } from "../services/mission.service.js";

export const handleCompleteMission = async (req: Request, res: Response) => {
    // URL 파라미터에서 memberMissionId를 가져옵니다. (예: /api/v1/missions/5/complete)
    const { memberMissionId } = req.params;

    try {
        const result = await completeMission(Number(memberMissionId));
        
        return res.status(200).json({
            success: true,
            message: "미션이 성공적으로 완료 처리되었습니다.",
            result: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "상태 변경 중 오류가 발생했습니다."
        });
    }
};
