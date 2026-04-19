// 1. 회원가입 요청 데이터의 설계도를 만듭니다.
export interface UserSignUpRequest {
  email: string;
  name: string;
  gender?: "MALE" | "FEMALE";
  birthDate: string;
  address?: string;
  phoneNumber?: string;
  preferences: number[];
}

export interface UserResponse {
  id: number;
  email: string;
  name: string;
  gender?: "MALE" | "FEMALE";
  birthDate: Date;
  address?: string;
  phoneNumber?: string;
  preferences: {
    id: number;
    name: string;
  }[];
}

export interface User {
  id: number;
  email: string;
  name: string;
  gender?: "MALE" | "FEMALE";
  birthDate: Date;
  address: string;
  phoneNumber: string;
}

interface ResponseFromUserParams {
  user: User;
  preferences: any[];
}

export const responseFromUser = ({
  user,
  preferences,
}: ResponseFromUserParams): UserResponse => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    gender: user.gender ?? undefined,
    birthDate: user.birthDate,
    address: user.address || undefined,
    phoneNumber: user.phoneNumber || undefined,
    preferences: preferences.map((p) => ({
      id: p.food_id,
      name: p.name,
    })),
  };
};
