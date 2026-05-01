// 요청 본문의 타입을 정의
export interface AddStoreRequestDTO {
  name: string;
  foodCategory: string;
}

// 응답 타입을 정의 
export interface StoreResponseDTO {
  id: number;//가게 아이디
  name: string;//가게 이름
  region: string; // 예시로 지역 이름도 포함
  foodCategory: string;
}

export const responseFromStore = (store: any) => {
  return {
    id: store.id,
    name: store.name,
    region: store.region_name,
    foodCategory: store.food_category,
  };
};


