// 1. 회원가입 요청 데이터의 설계도를 만듭니다.
export interface UserSignUpRequest {
  email: string;
  password: string;
  name: string;
  gender?: "MALE" | "FEMALE";
  birthDate: string;
  address?: string;
  phoneNumber?: string;
  preferences: number[];
}

export interface User {
  id: bigint;
  email: string;
  name: string;
  gender?: "MALE" | "FEMALE";
  birthDate: Date;
  address?: string;
  phoneNumber?: string;
}

export interface UserPreference {
  food_id: bigint;
  name: string;
}

interface UserResponse {
  email: string;
  name: string;
  preferences: string[];
}

export const responseFromUser = (data: {
  user: any;
  preferences: any[];
}): UserResponse => {
  const perferCategory = data.preferences.map((p) => p.food?.name ?? null);

  return {
    email: data.user.email,
    name: data.user.name,
    preferences: perferCategory,
  };
};
