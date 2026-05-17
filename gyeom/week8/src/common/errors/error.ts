import { AppError } from "./app.error.js";

// 유저 관련
export class DuplicateUserEmailError extends AppError {
  constructor(message: string = "이미 존재하는 이메일입니다.") {
    super(409, message);
  }
}

export class UserNotFoundError extends AppError {
  constructor(message: string = "존재하지 않는 사용자입니다.") {
    super(404, message);
  }
}

// 가게 관련
export class StoreNotFoundError extends AppError {
  constructor(message: string = "존재하지 않는 가게입니다.") {
    super(404, message);
  }
}

// 미션 관련
export class MissionNotFoundError extends AppError {
  constructor(message: string = "존재하지 않는 미션입니다.") {
    super(404, message);
  }
}

export class AlreadyChallengingError extends AppError {
  constructor(message: string = "이미 도전 중인 미션입니다.") {
    super(409, message);
  }
}

export class NotChallengingError extends AppError {
  constructor(message: string = "진행 중인 미션이 아닙니다.") {
    super(400, message);
  }
}