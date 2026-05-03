// 1. 회원가입 요청 데이터의 설계도를 만듭니다.
export interface UserSignUpRequest {
  email: string;
  name: string;
  gender: string;
  birth: string;
  address?: string;       // ?가 붙으면 '없을 수도 있음(선택)'이라는 뜻이에요!
  detailAddress?: string;
  password: string;
  phoneNumber: string;
  preferences: number[];
}

// 2. 요청받은 데이터를 우리 시스템에 맞는 데이터로 변환해주는 함수입니다.
export const bodyToUser = (body: UserSignUpRequest) => {
  const birth = new Date(body.birth); // 날짜 변환
  return {
    email: body.email,       // 필수
    name: body.name,         // 필수
    gender: body.gender,     // 필수
    birth,                   // 필수
    address: body.address || "",         // 선택
    detailAddress: body.detailAddress || "", // 선택
    phoneNumber: body.phoneNumber,       // 필수
    preferences: body.preferences,      // 필수
  };
};

interface UserRow {
  id: bigint;
  email: string;
  name: string;
}

interface UserPreferenceRow {
  food_category_id: bigint;
  user_id: bigint;
  foodCategory: {
    name: string;
  };
}

interface UserMissionRow {
  id: bigint;
  user_id: bigint;
  mission_id: bigint;
  status: string;
}

// export const responseFromUser = ({
//   user,
//   preferences,
// }: {
//   user: any;
//   preferences: any[];
// }) => {
//   return {
//     email: user.email,
//     name: user.name,
//     preferences: preferences.map((p) => p.name),
//   };
// };

export interface UserSignUpResponse {
  email: string;
  name: string;
  preferCategory: string[];
}

export const responseFromUser = (data: { user: UserRow; preferences: UserPreferenceRow[] }): UserSignUpResponse => {
  const preferCategory = data.preferences.map((p) => p.foodCategory.name);
  return {
    email: data.user.email,
    name: data.user.name,
    preferCategory,
  };
};

export interface UserMissionAddRequest {
  missionId: number;
}

export const bodyToUserMission = (userId: number, body: UserMissionAddRequest) => {
  return {
    userId,
    missionId: body.missionId,
  };
};

export const responseFromUserMission = ({ userMission }: { userMission: UserMissionRow | null }) => {
  return {
    id: userMission?.id,
    userId: userMission?.user_id,
    missionId: userMission?.mission_id,
    status: userMission?.status,
  };
};

export const responseFromUserMissions = ({ userMissions }: { userMissions: UserMissionRow[] }) => {
  return userMissions.map((userMission) => responseFromUserMission({ userMission }));
};
