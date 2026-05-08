import { Body, Controller, Post, Route, SuccessResponse, Tags } from "tsoa";
import { StatusCodes } from "http-status-codes";

import { UserSignUpRequest } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

@Route("users")
@Tags("User")
export class UserController extends Controller {
  @SuccessResponse(StatusCodes.CREATED, "회원가입 성공")
  @Post("/signup")
  public async handleUserSignUp(@Body() data: UserSignUpRequest) {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", data);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 이메일 형식 검사
    if (!emailRegex.test(data.email)) {
      this.setStatus(StatusCodes.BAD_REQUEST);

      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: "올바르지 않은 이메일 형식입니다.",
        data: null,
      };
    }

    // 비밀번호 형식 검사
    if (!data.password || data.password.length < 6) {
      this.setStatus(StatusCodes.BAD_REQUEST);

      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: "비밀번호는 6자 이상이어야 합니다.",
        data: null,
      };
    }

    // preferences 존재 여부
    if (!data.preferences || data.preferences.length === 0) {
      this.setStatus(StatusCodes.BAD_REQUEST);

      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: "선호 카테고리를 최소 1개 선택해야 합니다.",
        data: null,
      };
    }

    const user = await userSignUp(data);

    this.setStatus(StatusCodes.CREATED);

    return {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "회원가입이 완료되었습니다.",
      data: user,
    };
  }
}
