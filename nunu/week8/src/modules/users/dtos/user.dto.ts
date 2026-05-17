// 1. 회원가입 요청 데이터의 설계도를 만듭니다.
export interface UserSignUpRequest {
  /**
   * 사용자 이메일
   * @example test@test.com
   */
  email: string;

  /**
   * 비밀번호
   * @example 123456
   */
  password: string;

  /**
   * 사용자 이름
   * @example UMC
   */
  name: string;

  /**
   * 성별
   * @example MALE
   */
  gender?: "MALE" | "FEMALE";

  /**
   * 생년월일
   * @example 2000-01-01
   */
  birthDate: string;

  /**
   * 주소
   * @example 서울특별시 강남구
   */
  address?: string;

  /**
   * 전화번호
   * @example 010-1234-5678
   */
  phoneNumber?: string;

  /**
   * 선호 카테고리 ID 목록
   * @example [1, 2]
   */
  preferences: number[];
}

export class UserSignUpRequestExample {
  email!: string;
  password!: string;
  name!: string;
  gender?: "MALE" | "FEMALE";
  birthDate!: string;
  address?: string;
  phoneNumber?: string;
  preferences!: number[];
}

interface UserResponse {
  id: number;
  email: string;
  name: string;
  preferences: string[];
}

export const responseFromUser = (data: {
  user: any;
  preferences: any[];
}): UserResponse => {
  const preferCategory = data.preferences.map((p) => p.food?.name ?? null);

  return {
    id: Number(data.user.id),
    email: data.user.email,
    name: data.user.name,
    preferences: preferCategory,
  };
};
