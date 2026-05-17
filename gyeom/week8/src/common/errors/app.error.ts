export class AppError extends Error {
  statusCode: number;
  success: boolean;

  constructor(statusCode: number, message: string) {
    super(message);

    this.success = false;
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}