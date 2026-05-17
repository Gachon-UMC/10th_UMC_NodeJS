import { prisma } from "../../../db.config.js";
import { getMyMissions } from "../repositories/mission.repository.js";
import { MissionStatus } from "../../../generated/prisma/enums.js";
import { success } from "../../../common/responses/response.js";
import { 
    UserNotFoundError, 
    MissionNotFoundError, 
    MissionAlreadyChallengingError,
    MemberMissionNotFoundError,
    AlreadyCompletedError 
} from "../../../common/errors/custom.error.js";

export const listMyMissions = async (userId: number, statusType: string, take: number, cursor?: number) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new UserNotFoundError("존재하지 않는 사용자입니다.", { userId });
    }

    const status: MissionStatus = 
        statusType.toUpperCase() === "COMPLETE" ? MissionStatus.COMPLETE : MissionStatus.CHALLENGING;

    const missions = await getMyMissions(userId, status, take, cursor);

    const result = {
        missions: missions.map((m) => ({
            id: m.id,
            status: m.status,
            createdAt: m.createdAt.toISOString(),
            updatedAt: m.updatedAt.toISOString(),
            reward: m.mission?.reward,
            missionSpec: m.mission?.missionSpec,
            storeName: m.mission?.store?.name,
        })),
        cursor: missions.at(-1)?.id ?? null,
        isLastPage: missions.length < take
    };

    return success(result);
};

export const challengeMission = async (userId: number, missionId: number) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UserNotFoundError("존재하지 않는 사용자입니다.", { userId });

    const mission = await prisma.mission.findUnique({ where: { id: missionId } });
    if (!mission) throw new MissionNotFoundError("존재하지 않는 미션입니다.", { missionId });

    const existingChallenge = await prisma.memberMission.findFirst({
        where: { userId, missionId, status: "CHALLENGING" }
    });
    
    if (existingChallenge) {
        throw new MissionAlreadyChallengingError("이미 도전 중인 미션입니다.", { userId, missionId });
    }

    const data = await prisma.memberMission.create({
        data: { userId, missionId, status: "CHALLENGING" }
    });

    return success(data);
};

export const completeMission = async (memberMissionId: number) => {
    const memberMission = await prisma.memberMission.findUnique({
        where: { id: memberMissionId }
    });

    if (!memberMission) {
        throw new MemberMissionNotFoundError("존재하지 않는 사용자 미션 기록입니다.", { memberMissionId });
    }

    if (memberMission.status === MissionStatus.COMPLETE) {
        throw new AlreadyCompletedError("이미 완료된 미션입니다.", { memberMissionId });
    }

    const result = await prisma.memberMission.update({
        where: { id: memberMissionId },
        data: { status: MissionStatus.COMPLETE }
    });

    return success(result);
};