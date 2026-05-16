import { MissionStatus } from "../../../generated/prisma/enums.js";
import { prisma } from "../../../db.config.js";

export const getMyMissions = async (userId: number, status: MissionStatus, take: number, cursor?: number ) => {
    return await prisma.memberMission.findMany({
        where: { 
            userId, 
            status, // "CHALLENGING" 또는 "COMPLETE"
        },
        take,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor } : undefined,
        include: {
            mission: {
                select: {
                    reward: true,      // 500P
                    missionSpec: true, // 12,000원 이상의 식사를 하세요!
                    store: {
                        select: {
                            name: true // 가게이름a
                        }
                    }
                }
            }
        },
        orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }]
    });
};

export const createMemberMission = async (userId: number, missionId: number) => {
    return await prisma.memberMission.create({
        data: {
            userId: userId,
            missionId: missionId,
            status: "CHALLENGING" // 기본값은 진행 중
        }
    });
};

export const updateMemberMissionStatus = async (memberMissionId: number, status: MissionStatus) => {
    return await prisma.memberMission.update({
        where: {
            id: memberMissionId, // 바꿀 미션의 고유 번호 (예: 5)
        },
        data: {
            // "COMPLETE"라는 문자열을 직접 넣지 않고, 서비스에서 넘겨준 값을 사용합니다.
            status: MissionStatus.COMPLETE 
        },
    });
};