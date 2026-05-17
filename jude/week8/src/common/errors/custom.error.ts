import { AppError} from "./app.error.js";

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

export class UserNotFoundError extends AppError {
    constructor(message: string , data?: unknown) {
        super({ 
          errorCode: "USER_NOT_FOUND",
          statusCode: 404,
          message, 
          data
        });
    }
}

export class MissionAlreadyChallengingError extends AppError {
    constructor(message: string ,data?: unknown) {
        super({ 
          errorCode: "MISSION_ALREADY_CHALLENGING", 
          statusCode: 409,
          message, 
          data
        });
    }
}

export class StoreNotFoundError extends AppError {
    constructor(message: string ,data?: unknown) {
        super({ 
          errorCode: "STORE_NOT_FOUND", 
          statusCode: 409,
          message, 
          data
        });
    }
}

export class MissionNotFoundError extends AppError {
    constructor(message: string , data?: unknown) {
        super({
            errorCode: "MISSION_NOT_FOUND",
            statusCode: 404,
            message,
            data,
        });
    }
}

export class MemberMissionNotFoundError extends AppError {
    constructor(message: string, data?: unknown) {
        super({
            errorCode: "MEMBERMISION_NOT_FOUND",
            statusCode: 404,
            message,
            data,
        });
    }
}

export class AlreadyCompletedError extends AppError {
    constructor(message: string , data?: unknown) {
        super({
            errorCode: "ALREADY_COMPLETED",
            statusCode: 400,
            message,
            data,
        });
    }
}