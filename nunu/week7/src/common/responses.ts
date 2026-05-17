export interface SuccessResponse<T> {
  success: true;
  statusCode: number;
  message: string;
  data: T;
}

export const success = <T>(
  data: T,
  message = "성공",
  statusCode = 200,
): SuccessResponse<T> => ({
  success: true,
  statusCode,
  message,
  data,
});
