import { AppError } from "./app.error";

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
export class DuplicateUserStoreError extends AppError {
  constructor(message: string, data?: unknown) {
    super({
      errorCode: "S001",
      statusCode: 409,
      message,
      data,
    });
  }
}

