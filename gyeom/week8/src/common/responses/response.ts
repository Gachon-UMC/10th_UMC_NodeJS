export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T | null;
}
export const success = <T>(statusCode: number, message: string, data: T): ApiResponse<T> => ({
  success: true,
  statusCode,
  message,
  data,
});

