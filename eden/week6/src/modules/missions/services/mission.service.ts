
import { getUser } from "../../users/repositories/user.repository";
import { AddMissionRequestDTO, responseFromChallenge, responseFromMission, responseFromStoreMissions, responseFromUserMissions } from "../dtos/mission.dto";
import { addMission, challengeMission, getMission, getMissionsByStoreId, getStoreById, getUserMissionsByUserId, isMissionChallenged } from "../repositories/mission.repository";

export const createMission = async (storeId: number, missionData: AddMissionRequestDTO) => {
  // 가게가 실제로 존재하는지 확인
  const store = await getStoreById(storeId);
  if (!store) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  // 가게가 존재하면 미션을 추가
  const newMissionId = await addMission(storeId, {
    content: missionData.content,
    point: missionData.point,
  });

  // 매퍼를 사용하여 결과 반환 
  return responseFromMission(newMissionId);
};

// 특정 가게의 미션 목록 조회 서비스
export const listStoreMissions = async (storeId: number) => {
    // 레포지토리를 호출하여 데이터베이스에서 미션 목록을 가져옵니다.
    const missions = await getMissionsByStoreId(storeId);

    //DTO 변환 함수를 사용하여 응답 데이터를 가공합니다.
    return responseFromStoreMissions(missions);
}
//진행중인 미션 목록 조회 서비스
export const listUserMissions=async(userId:number)=>{
  //레포지토리를 호출하여 데이터베이스에서 진행중인 미션 목록을 가져옵니다.
  const missions=await getUserMissionsByUserId(userId);
  //DTO 변환 함수를 사용하여 응답 데이터를 가공합니다.
  return responseFromUserMissions(missions);
}
export const startMissionChallenge = async (userId: number, missionId: number) => {
  // 사용자 존재 여부 확인
  const user = await getUser(userId); // user.repository 등에 정의된 함수
  if (!user) {
    const err = new Error("존재하지 않는 사용자입니다.");
    (err as any).statusCode = 404; // Not Found
    throw err;
  }

  // 미션 존재 여부 확인
  const mission = await getMission(missionId); // mission.repository 등에 정의된 함수
  if (!mission) {
    const err = new Error("존재하지 않는 미션입니다.");
    (err as any).statusCode = 404; // Not Found
    throw err;
  }

  // 사용자가 이미 해당 미션에 도전 중인지 확인
  const isAlreadyChallenged = await isMissionChallenged(userId, missionId);
  if (isAlreadyChallenged) {
    const err = new Error("이미 도전 중인 미션입니다.");
    (err as any).statusCode = 409; // Conflict
    throw err;
  }

  // 모든 검증을 통과하면 미션 도전 추가
  const newUserMissionId = await challengeMission(userId, missionId);

  // 매퍼를 사용하여 결과 반환
  return responseFromChallenge(newUserMissionId);
};
