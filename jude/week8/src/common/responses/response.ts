export interface ApiResponse<T> {
  resultType: "SUCCESS";
  error: null;
  data: T;
}
export const success = <T>(data: T): ApiResponse<T> => ({
  resultType: "SUCCESS",
  error: null,
  data,
});

export interface ApiFailResponse {
  resultType: "FAIL";
  error: {
    errorCode: string;
    reason: string;
    data?: unknown;
  };
  data: null; 
}

export const fail = (errorCode: string, reason: string, data: any = null): ApiFailResponse => ({
  resultType: "FAIL",
  error: {
    errorCode,
    reason,
    data,
  },
  data: null,
});