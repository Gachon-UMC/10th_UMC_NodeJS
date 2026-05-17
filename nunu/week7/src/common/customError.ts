import { AppError } from "./errors.js";

export class DuplicateUserEmailError extends AppError {
  data?: unknown;
  errorCode: string;

  constructor(data?: unknown) {
    super("이미 존재하는 이메일입니다.", 409);
    this.errorCode = "U001";
    this.data = data;
  }
}

export class InvalidEmailFormatError extends AppError {
  data?: unknown;
  errorCode: string;

  constructor(data?: unknown) {
    super("올바르지 않은 이메일 형식입니다.", 400);
    this.errorCode = "U002";
    this.data = data;
  }
}

export class InvalidPasswordError extends AppError {
  data?: unknown;
  errorCode: string;

  constructor(data?: unknown) {
    super("비밀번호는 6자 이상이어야 합니다.", 400);
    this.errorCode = "U003";
    this.data = data;
  }
}

export class EmptyPreferencesError extends AppError {
  data?: unknown;
  errorCode: string;

  constructor(data?: unknown) {
    super("선호 카테고리를 최소 1개 선택해야 합니다.", 400);
    this.errorCode = "U004";
    this.data = data;
  }
}
