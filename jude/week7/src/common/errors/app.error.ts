
export class AppError extends Error {
  public readonly errorCode: string;
  public readonly statusCode: number;
  public readonly data?: any;

  constructor(params?: {
    errorCode: string;
    message: string;
    statusCode: number;
    data?: any;
  }) {
    super(params?.message);
    this.errorCode = params?.errorCode ?? "UNKNOWN";
    this.statusCode = params?.statusCode ?? 500;
    this.data = params?.data ?? null;
  }
}

export class DuplicateUserEmailError extends AppError {
  constructor(message: string, data?: unknown) {
    super({
      errorCode: "U001",
      statusCode: 409,
      message,
      data,
    });
  }
}





