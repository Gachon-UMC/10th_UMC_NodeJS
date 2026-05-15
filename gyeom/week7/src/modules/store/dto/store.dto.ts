export interface StoreAddRequest {
  name: string;
  foodCategoryId: number;
  regionId: number;
  address: string;
  latitude: number;
  longitude: number;
}

export interface StoreAddResponse {
  id: number;
  name: string;
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