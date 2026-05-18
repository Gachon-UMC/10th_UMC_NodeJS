export interface ApiResponse<T> {
  resultType: "SUCCESS";
  error: null;
  data: T;
}
export interface UserErrorResponse {
  success: boolean;       
  statusCode: number;   
  data: null;             
}
export interface StoreErrorResponse {
  success: boolean;       
  statusCode: number;   
  data: null;             
}

export interface ReviewErrorResponse {
  success: boolean;       
  statusCode: number;   
  data: null;             
}
export interface MissionErrorResponse {
  success: boolean;       
  statusCode: number;   
  data: null;             
}
export const success = <T>(data: T): ApiResponse<T> => ({
  resultType: "SUCCESS",
  error: null,
  data,
});