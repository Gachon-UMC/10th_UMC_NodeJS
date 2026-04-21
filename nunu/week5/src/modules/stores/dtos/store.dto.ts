export interface StoreRequest {
  name: string;
  storeType: string;
  regionId: number;
}

export interface StoreResponse {
  id: number;
  name: string;
}

export const responseFromStore = (store: StoreResponse) => {
  return {
    id: store.id,
    name: store.name,
  };
};
