export interface UserSignUpRequest {
  email: string;
  name: string;
  gender: string;
  birth: string;
  address?: string;
  detailAddress?: string;
  password: string;
  phoneNumber: string;
  preferences: number[];
}

interface UserRow {
  id: bigint;
  email: string;
  name: string;
}

interface UserPreferenceRow {
  foodCategoryId: bigint;
  userId: bigint;
  foodCategory: {
    name: string;
  };
}

interface UserMissionRow {
  id: bigint;
  userId: bigint;
  missionId: bigint;
  status: string;
}

export const bodyToUser = (body: UserSignUpRequest) => {
  const birth = new Date(body.birth);
  return {
    email: body.email,
    name: body.name,
    gender: body.gender,
    birth,
    address: body.address || "",
    detailAddress: body.detailAddress || "",
    phoneNumber: body.phoneNumber,
    preferences: body.preferences,
  };
};

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
    userId: userMission?.userId,
    missionId: userMission?.missionId,
    status: userMission?.status,
  };
};

export const responseFromUserMissions = ({ userMissions }: { userMissions: UserMissionRow[] }) => {
  return userMissions.map((userMission) => responseFromUserMission({ userMission }));
};