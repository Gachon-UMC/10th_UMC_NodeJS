import * as bcrypt from "bcrypt"; // bcrypt import
import { responseFromChallenge, UserSignUpRequest } from "../dtos/user.dtos.js"; //인터페이스 가져오기 
import { responseFromUser } from "../dtos/user.dtos.js";
import {
  addUser,
  challengeMission,
  getMission,
  getUser,
  getUserPreferencesByUserId,
  isMissionChallenged,
  setPreference,
} from "../repositories/user.repository.js";

export const userSignUp = async (data: UserSignUpRequest) => {
  // 1. 비밀번호 해싱 (salt round는 10~12가 일반적)
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);

  // 2. 해시된 비밀번호로 addUser 함수 호출
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    password: hashedPassword, // 원본 비밀번호 대신 해시된 비밀번호 전달
    gender: data.gender,
    birth: new Date(data.birth), // 문자열을 Date 객체로 변환해서 넘겨줍니다. 
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
  });

  if (joinUserId === null) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};

export const startMissionChallenge = async (userId: number, missionId: number) => {
  // [추가] 1. 사용자 존재 여부 확인
  const user = await getUser(userId); // user.repository 등에 정의된 함수
  if (!user) {
    const err = new Error("존재하지 않는 사용자입니다.");
    (err as any).statusCode = 404; // Not Found
    throw err;
  }

  // [추가] 2. 미션 존재 여부 확인
  const mission = await getMission(missionId); // mission.repository 등에 정의된 함수
  if (!mission) {
    const err = new Error("존재하지 않는 미션입니다.");
    (err as any).statusCode = 404; // Not Found
    throw err;
  }

  // 3. 사용자가 이미 해당 미션에 도전 중인지 확인
  const isAlreadyChallenged = await isMissionChallenged(userId, missionId);
  if (isAlreadyChallenged) {
    const err = new Error("이미 도전 중인 미션입니다.");
    (err as any).statusCode = 409; // Conflict
    throw err;
  }

  // 4. 모든 검증을 통과하면 미션 도전 추가
  const newUserMissionId = await challengeMission(userId, missionId);

  // 5. 매퍼를 사용하여 결과 반환
  return responseFromChallenge(newUserMissionId);
};
