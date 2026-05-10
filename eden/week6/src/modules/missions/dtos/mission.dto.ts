// 미션 추가 요청 본문의 타입을 정의합니다.
export interface AddMissionRequestDTO {
  content: string;
  point: number;
}
// 미션 추가 서비스의 응답 형태를 정의하는 DTO
export const responseFromMission = (missionId: number) => {
  return {
    newMissionId: missionId
  };
};

// 요청 파라미터 타입 정의 
export interface ListStoreMissionsRequestParams {
    storeId: string; 
}

// 가게 미션 응답 데이터의 단일 미션 항목 타입 정의
interface Mission {
    id: number;
    point: number;
    content: string;
    deadline: Date;
}

// 가게 미션 최종 응답 데이터 타입 정의 
export type ListStoreMissionsResponse = Mission[];

// 가게 미션 레포지토리에서 받은 데이터를 API 응답 형태로 변환하는 함수
export const responseFromStoreMissions = (data: any[]): ListStoreMissionsResponse => {
    return data.map(mission => ({
        id: mission.id,
        point: mission.point,
        content: mission.content,
        deadline: mission.expired_at,
    }));
}
//진행중인 미션 데이터 타입정의
interface UserMission {
  id: number;
  store_name: string;
  content: string;
  point: number; 
  deadline: Date;
}
//최종 응답 데이터
export type ListUserMissionsResponse=UserMission[];
//진행중인 미션 응답 데이터 타입 정의
export const responseFromUserMissions = (data: any[]): ListUserMissionsResponse => {
  
  return data.map(item => ({
    id: item.id, 
    
    store_name: item.mission.store.name,
    content: item.mission.content,
    
    point: item.mission.point,
    deadline: item.mission.expired_at,
  }));
}
export const responseFromChallenge = (userMissionId: number) => {
  return {
    newUserMissionId: userMissionId
  };
};

