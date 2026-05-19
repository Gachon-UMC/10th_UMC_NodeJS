import { Prisma } from "../../../generated/prisma/client.js";

export interface StoreAddRequest {
  name: string;
  foodCategoryId: number;
  regionId: number;
  address: string;
  latitude: number;
  longitude: number;
}

interface StoreRow {
  id: bigint;
  name: string;
  regionId: bigint;
  address: string;
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

export const responseFromStore = ({ store }: { store: StoreRow | null }) => {
  return {
    name: store?.name,
    regionId: store?.regionId,
  };
};