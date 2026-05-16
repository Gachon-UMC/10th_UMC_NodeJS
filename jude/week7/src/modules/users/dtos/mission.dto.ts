import { MemberMission } from "../../../generated/prisma/client.js";
import { MissionStatus } from "../../../generated/prisma/enums.js";

// 1. 미션 목록 조회 응답 구조
export interface MissionListResponse {
    success: boolean;
    result: {
        missions: MissionData[];
        cursor: number | null;
        isLastPage: boolean;
    };
}

// 2. 미션 도전/완료 성공 응답 구조
export interface MissionActionResponse {
    success: boolean;
    message: string;
    result: MemberMission;
}

// 3. 에러 발생 시 응답 구조
export interface MissionErrorResponse {
    success: boolean;
    message: string;
}

export interface MissionData {
    id: number;
    status: MissionStatus;
    createdAt: Date;
    updatedAt: Date;
    reward: number;
    missionSpec: string;
    storeName: string;
}

