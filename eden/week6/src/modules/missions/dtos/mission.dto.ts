// 미션 추가 요청 본문의 타입을 정의합니다.
export interface AddMissionRequestDTO {
  content: string;
  point: number;
}
// mission.dto.ts 혹은 mission.mapper.ts
export const responseFromMission = (missionId: number) => {
  return {
    newMissionId: missionId
  };
};