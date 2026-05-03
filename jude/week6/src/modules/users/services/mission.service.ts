import { getMyMissionsByStatus, createMemberMission, updateMissionStatus }from "../repositories/mission.repository.js";

export const listMyMissions = async (userId: number, statusType: string, cursor?: number) => {
    // UI의 버튼에 맞춰 DB 상태값으로 매핑
    const status = statusType === "complete" ? "COMPLETE" : "CHALLENGING";
    return await getMyMissionsByStatus(userId, status, cursor);
};

export const challengeMission = async (userId: number, missionId: number) => {
    return await createMemberMission(userId, missionId);
};

// src/modules/users/services/mission.service.ts
export const completeMission = async (memberMissionId: number) => {
    
    return await updateMissionStatus(memberMissionId, "COMPLETE"); 
};