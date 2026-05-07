import { type UserSignUpRequest } from "../dtos/user.dto.js"; //인터페이스 가져오기 
import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  confirmStore,
  getStore,
  existsStore, 
  addReview, 
  getReviewResponse,
  isAlreadyChallenging, 
  addMemberMission, 
  getMemberMissionResponse
} from "../repositories/user.repository.js";

export const userSignUp = async (data: UserSignUpRequest) => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
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

  return responseFromUser({ ...user, preferences });
};

export const createStore = async (body: any) => {
  const storeId = await confirmStore({
    name: body.name,
    storeType: body.storeType,
    regionId: body.regionId,
  });

  const store = await getStore(storeId);
  return store;
};

export const createReview = async (storeId: number, body: any) => {
    // 1. 가게 존재 여부 검증
    const isExist = await existsStore(storeId);
    if (!isExist) {
        throw new Error("존재하지 않는 가게입니다.");
    }

    // 2. 리뷰 추가 (사용자 ID는 1번으로 가정)
    const reviewId = await addReview(1, storeId, body);
    
    // 3. 응답용 데이터 조회
    return await getReviewResponse(reviewId);
};

export const challengeMission = async (missionId: number) => {
    const userId = 1; // 조건: 특정 사용자(1번)로 가정

    // 1. 중복 도전 검증
    const exists = await isAlreadyChallenging(userId, missionId);
    if (exists) {
        throw new Error("이미 도전 중인 미션입니다.");
    }

    // 2. 미션 도전 등록
    const id = await addMemberMission(userId, missionId);
    
    // 3. 결과 반환
    return await getMemberMissionResponse(id);
};