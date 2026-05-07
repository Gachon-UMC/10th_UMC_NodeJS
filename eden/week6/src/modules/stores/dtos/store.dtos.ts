// 요청 본문의 타입을 정의
export interface AddStoreRequestDTO {
  name: string;
  foodCategory: string;
}

// 응답 타입을 정의 
export interface StoreResponseDTO {
  id: number;
  name: string;
  region: string; 
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

