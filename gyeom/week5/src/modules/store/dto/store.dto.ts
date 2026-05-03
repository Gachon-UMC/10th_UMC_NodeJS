export interface StoreAddRequest {
  name: string;
  foodCategoryId: number;
  regionId: number;
  address: string;
  latitude: number;
  longitude: number;
}

interface StoreRow {
  id: number;
  name: string;
  food_category_id: number;
  region_id: number;
  address: string;
  latitude: number;
  longitude: number;
}

export const bodyToStore = (body: StoreAddRequest) => {
  return {
    name: body.name,
    foodCategoryId: body.foodCategoryId,
    regionId: body.regionId,
    address: body.address,
    latitude: body.latitude,
    longitude: body.longitude,
  };
};

export const responseFromStore = ({ store }: { store: StoreRow }) => {
  return {
    name: store.name,
    regionId: store.region_id,
  };
};