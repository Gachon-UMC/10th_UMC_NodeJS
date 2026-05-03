import { prisma } from "../../../db.config.js";

export const getMyMissionsByStatus = async (userId: number, status: string, cursor?: number) => {
    return await prisma.memberMission.findMany({
        where: { 
            userId: userId,
            status: status // "CHALLENGING" 또는 "COMPLETE"
        },
        take: 10,
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
        orderBy: { updatedAt: 'desc' }
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
export const updateMissionStatus = async (memberMissionId: number, status: string) => {
    return await prisma.memberMission.update({
        where: {
            id: memberMissionId,
        },
        data: {
            status: "COMPLETE"
        },
    });
};