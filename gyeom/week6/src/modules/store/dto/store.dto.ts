export interface StoreAddRequest {
  name: string;
  foodCategoryId: number;
  regionId: number;
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

export const responseFromStore = ({ store }: { store: any }) => {
  return {
    name: store.name,
    regionId: store.regionId,
  };
};

export interface ReviewResponse {
  id: number;
  content: string;
  store: {
    id: number;
    name: string;
  };
  user: {
    id: number;
    email: string;
    name: string;
    gender: string;
    birth: Date;
    address: string;
    detailAddress: string | null;
    phoneNumber: string;
  };
}

export interface ReviewListResponse {
  data: ReviewResponse[];
  pagination: {
    cursor: number | null;
  };
}

export const responseFromReviews = (
  reviews: ReviewResponse[]
): ReviewListResponse => {
  const lastReview = reviews[reviews.length - 1];
  return {
    data: reviews,
    pagination: {
      cursor: lastReview ? lastReview.id : null,
    },
  };
};