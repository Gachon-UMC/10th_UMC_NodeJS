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
  id: number;
  email: string;
  name: string;
  gender: string;
  birth: Date;
  address: string;
  detail_address: string;
  phone_number: string;
}

interface UserPreferenceRow {
  id: number;
  food_category_id: number;
  user_id: number;
  name: string;
}

interface UserMissionRow {
  id: number;
  user_id: number;
  mission_id: number;
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

export const responseFromUser = ({
  user,
  preferences,
}: {
  user: UserRow;
  preferences: UserPreferenceRow[];
}) => {
  return {
    email: user.email,
    name: user.name,
    preferences: preferences.map((p) => p.name),
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

export const responseFromUserMission = ({ userMission }: { userMission: UserMissionRow }) => {
  return {
    id: userMission.id,
    userId: userMission.user_id,
    missionId: userMission.mission_id,
    status: userMission.status,
  };
};