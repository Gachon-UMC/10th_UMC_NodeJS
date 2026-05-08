import {
  Body,
  Controller,
  Get,
  Middlewares,
  Post,
  Request,
  Route,
  SuccessResponse,
  Tags,
} from "tsoa";
import { StatusCodes } from "http-status-codes";
import { UserSignUpRequest } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { authorizeUser } from "../../../middlewares/auth.middleware.js";
import { Request as ExpressRequest } from "express";
import { success } from "../../../common/responses.js";
import { AppError } from "../../../common/errors.js";

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
      throw new AppError(
        "올바르지 않은 이메일 형식입니다.",
        StatusCodes.BAD_REQUEST,
      );
    }

    // 비밀번호 형식 검사
    if (!data.password || data.password.length < 6) {
      throw new AppError(
        "비밀번호는 6자 이상이어야 합니다.",
        StatusCodes.BAD_REQUEST,
      );
    }

    // preferences 존재 여부
    if (!data.preferences || data.preferences.length === 0) {
      throw new AppError(
        "선호 카테고리를 최소 1개 선택해야 합니다.",
        StatusCodes.BAD_REQUEST,
      );
    }

    const user = await userSignUp(data);

    this.setStatus(StatusCodes.CREATED);
    return success(user, "회원가입이 완료되었습니다.", 201);
  }

  @Get("guest")
  public async handleGuestPage(): Promise<String> {
    return `
            <h1>게스트 페이지</h1>
            <p>이 페이지는 로그인이 필요 없습니다.</p>
            <ul>
                <li><a href="/api/v1/users/mypage">마이페이지 (로그인 필요)</a></li>
            </ul>
        `;
  }
  @Get("login")
  public async handleLoginPage(): Promise<String> {
    return "<h1>로그인 페이지</h1><p>로그인이 필요한 페이지에서 튕겨나오면 여기로 옵니다.</p>";
  }
  @Get("mypage")
  @Middlewares(authorizeUser())
  public async handleMypage(@Request() req: ExpressRequest): Promise<String> {
    return `
            <h1>마이페이지</h1>
            <p>환영합니다, ${req.cookies.username}님!</p>
            <p>이 페이지는 로그인한 사람만 볼 수 있습니다.</p>
        `;
  }
  @Get("set-login")
  public async handleSetLogin(@Request() req: ExpressRequest): Promise<String> {
    req.res!.cookie("username", "UMC10th", { maxAge: 3600000 });
    return '로그인 쿠키(username=UMC9th) 생성 완료! <a href="/api/v1/users/mypage">마이페이지로 이동</a>';
  }
  @Get("set-logout")
  public async handleSetLogout(
    @Request() req: ExpressRequest,
  ): Promise<String> {
    req.res!.clearCookie("username");
    return '로그아웃 완료 (쿠키 삭제). <a href="/api/v1/users/guest">메인으로</a>';
  }
}
