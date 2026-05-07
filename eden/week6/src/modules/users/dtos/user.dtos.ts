
// 회원가입 요청 데이터 구조 정의
export interface UserSignUpRequest {
  email: string;
  name: string;
  password: string; 
  gender: string;
  birth: string | Date;
  address?: string;
  detailAddress?: string;
  phoneNumber: string;
 
  preferences: number[]; 
}

// 청받은 데이터를 우리 시스템에 맞는 데이터로 변환해주는 함수
export const bodyToUser = (body: UserSignUpRequest) => {
  const birth = new Date(body.birth); 

  return {
    email: body.email, 
    name: body.name,
    password: body.password, 
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
export const responseFromUser= (data: {user:any, preferences: any[]}): UserSignUpResponse => {
    const perferCategory= data.preferences.map((p)=>p.foodCategory.name);

    return {
        email: data.user.email,
        name: data.user.name,
        preferCategory: perferCategory,
    }

}


// 개별 선호 카테고리 아이템의 구조
export interface UserPreferenceItemDto {
  id: number;
  foodCategoryId: number;
  userId: number;
}

//전체 목록 응답 구조
export interface UserPreferenceResponseDto {
  preferences: UserPreferenceItemDto[];
}