export const missionResponseDTO = (missions: any[]) => {
    return missions.map((m) => ({
        memberMissionId: m.id,
        status: m.status,
        reward: m.mission.reward,         // 500P
        missionSpec: m.mission.missionSpec, // 12,000원 이상의 식사...
        storeName: m.mission.store.name,    // 가게이름a
        createdAt: m.createdAt
    }));
};