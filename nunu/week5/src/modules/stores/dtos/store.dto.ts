export interface CreateStoreRequest {
  name: string;
  storeType: string;
  regionId: number;
}

export interface CreateStoreResponse {
  id: number;
  name: string;
}

export const responseFromStore = (store: CreateStoreResponse) => {
  return {
    id: store.id,
    name: store.name,
  };
};
