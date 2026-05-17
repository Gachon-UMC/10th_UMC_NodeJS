export interface StoreAddRequest {
  /** 가게 이름 */
  name: string;
  /** 음식 카테고리 ID */
  foodCategoryId: number;
  /** 지역 ID */
  regionId: number;
  /** 가게 주소 */
  address: string;
  /** 위도 */
  latitude: number;
  /** 경도 */
  longitude: number;
}

export interface StoreAddResponse {
  /** 가게 ID */
  id: number;
  /** 가게 이름 */
  name: string;
  /** 지역 ID */
  regionId: number;
}

export interface StoreAddApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: StoreAddResponse | null;
}

export const toStoreResponse = (store: any): StoreAddResponse => {
  return {
    id: Number(store?.id),
    name: store?.name ?? "",
    regionId: Number(store?.regionId),
  };
};