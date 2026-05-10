// 1. 회원가입 요청 데이터의 설계도를 만듭니다.
export interface UserSignUpRequest {
  email: string;
  name: string;
  gender: string;
  birth: string;
  address?: string;       // ?가 붙으면 '없을 수도 있음(선택)'이라는 뜻이에요!
  detailAddress?: string;
  phoneNumber: string;
  preferences: number[];
}




export interface User {
  id: number;
  email: string;
  name: string;
  gender: string;
  birth: Date;
  address: string;
  detailAddress: string;
  phoneNumber: string;
}


export interface ResponseFromUserParams {
    user: User;
    preferences: any[];
    id: number;
    email: string;
    name: string;
    
}

export interface UserSignUpResponse {
    preferCategory: any[];
    email: string;
    name: string;
    
}









