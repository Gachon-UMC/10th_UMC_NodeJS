import { prisma } from "../../../db.config.js";
import { getMyMissions, createMemberMission, updateMemberMissionStatus }from "../repositories/mission.repository.js";
import { MissionStatus } from "../../../generated/prisma/enums.js";
import { MissionListResponse } from "../dtos/mission.dto.js";

export const listMyMissions = async (userId: number, statusType: string, take: number, cursor?: number) => {
    // [검증] 유저 존재 여부 확인
    // findUnique는 @unique나 @id가 설정된 필드로 조회할 때 성능이 가장 좋습니다.
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) {
        
        throw new Error("존재하지 않는 사용자입니다.");
    }

    const status: MissionStatus = 
        statusType.toUpperCase() === "COMPLETE" ? MissionStatus.COMPLETE : MissionStatus.CHALLENGING;

    //  [조회] 검증된 userId로 미션들 조회하기
    // Repository에 정의된 4개의 인자(userId, status, take, cursor)를 전달합니다.
    const missions = await getMyMissions(userId, status, take, cursor);

    return {
        // 1. 실제 미션 데이터 목록
        missions: missions.map((m) => ({
            id: m.id,
            status: m.status,
            createdAt: m.createdAt,
            updatedAt: m.updatedAt,
            reward: m.mission?.reward,
            missionSpec: m.mission?.missionSpec ,
            storeName: m.mission?.store?.name,
        })),

        // 2. 페이징 관련 정보
        
        cursor: missions.at(-1)?.id ?? null,
        
        
        isLastPage: missions.length < take
    };
};

export const challengeMission = async (userId: number, missionId: number) => {
    // 1. [검증] userId로 사용자가 존재하는지 확인
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });
    if (!user) {
        throw new Error("존재하지 않는 사용자입니다.");
    }

    // 2. [검증] missionId로 미션이 존재하는지 확인
    const mission = await prisma.mission.findUnique({
        where: { id: missionId }
    });
    if (!mission) {
        throw new Error("존재하지 않는 미션입니다.");
    }

    // 3. [검증] 이미 해당 유저가 이 미션에 도전 중인지 확인 (중복 체크)
    // MemberMission 테이블에서 userId와 missionId 조합이 있는지 찾습니다.
    const existingChallenge = await prisma.memberMission.findFirst({
        where: {
            userId,
            missionId,
            status: "CHALLENGING" 
        }
    });
    const data = await prisma.memberMission.create({
        data: {
            userId,
            missionId,
            status: "CHALLENGING"
        }
    });

    if (existingChallenge) {
        throw new Error("이미 도전 중인 미션입니다.");
    }

    // 4. 모든 검증 통과 후 미션 도전 데이터 생성 (Repository 호출)
    return {
        success: true,
        message: "미션 도전을 시작했습니다.",
        result: data // DB에서 생성된 데이터 객체
    };
};


export const completeMission = async (memberMissionId: number) => {
    // 1. [검증] memberMissionId로 해당 도전 기록이 존재하는지 확인
    const memberMission = await prisma.memberMission.findUnique({
        where: { id: memberMissionId }
    });

    if (!memberMission) {
        throw new Error("존재하지 않는 사용자 미션 기록입니다.");
    }

    // 2. [검증] 해당 미션이 이미 완료(COMPLETE) 상태인지 확인
    if (memberMission.status === MissionStatus.COMPLETE) {
        throw new Error("이미 완료된 미션입니다.");
    }

    const result = await prisma.memberMission.update({
        where: { id: memberMissionId },
        data: {
            status: MissionStatus.COMPLETE
        }
    });
    return {
        success: true,
        message: "미션이 성공적으로 완료 처리되었습니다.",
        result
    };
};