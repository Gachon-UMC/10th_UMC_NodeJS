
// 2. 회원가입 요청 데이터 설계도를 수정합니다.
export interface UserSignUpRequest {
  email: string;
  name: string;
  password: string; // password 필드 추가
  gender: string;
  birth: string | Date;
  address?: string;
  detailAddress?: string;
  phoneNumber: string;
  // 이제 숫자가 아닌 'KOREAN', 'CHINESE' 등의 배열만 허용됩니다.
  preferences: number[]; 
}

// 2. 요청받은 데이터를 우리 시스템에 맞는 데이터로 변환해주는 함수입니다. 
export const bodyToUser = (body: UserSignUpRequest) => {
  const birth = new Date(body.birth); //날짜 변환

  return {
    email: body.email, //필수 
    name: body.name, // 필수
    password: body.password, // password 필드 추가
    gender: body.gender, // 필수
    birth, // 필수
    address: body.address || "", //선택 
    detailAddress: body.detailAddress || "", //선택 
    phoneNumber: body.phoneNumber,//필수
    preferences: body.preferences,// 필수 
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
export const responseFromChallenge = (userMissionId: number) => {
  return {
    newUserMissionId: userMissionId
  };
};