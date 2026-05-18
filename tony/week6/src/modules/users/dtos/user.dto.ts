export interface UserSignUpRequest {
  /** 유저 이메일 (로그인 시 사용) */
  email: string;

  /** 유저 비밀번호 */
  password: string;

  /** 유저 이름 */
  name: string;

  /** 성별 */
  gender: string;

  /** 생년월일 */
  birth: string;

  /** 기본 주소 */
  address?: string;

  /** 상세 주소 */
  detailAddress?: string;

  /** 전화번호 */
  phoneNumber: string;

  /** 선호 카테고리 ID 배열 (예: [1, 2]) */
  preferences: number[];
}

export interface UserSignUpResponse {
  /** 가입한 유저 이메일 */
  email: string;

  /** 가입한 유저 이름 */
  name: string;

  /** 선호 카테고리 이름 배열 */
  preferCategory: string[];
}