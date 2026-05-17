import {
  Body,
  Controller,
  Get,
  Middlewares,
  Post,
  Request,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from "tsoa";
import { StatusCodes } from "http-status-codes";
import { UserSignUpRequest, UserSignUpResponse } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { authorizeUser } from "../../../common/middlewares/auth.middleware.js";
import { Request as ExpressRequest } from "express";
import { ApiResponse, success, ApiFailResponse } from "../../../common/responses/response.js";
import { AppError} from "../../../common/errors/app.error.js";

@Route("users") 
@Tags("Users")  


export class UserController extends Controller {

  /**
     * 회원가입 API
     * @summary 회원가입을 처리하는 엔드포인트입니다.
     */
    
    @SuccessResponse(StatusCodes.CREATED, "Created") // 성공 시 201 응답 설정
    @Post("signup")
    @Response<ApiResponse<UserSignUpResponse>>(200, "회원가입 성공")
    @Response<ApiFailResponse>(400, "중복된 이메일 에러")
    public async handleUserSignUp(
        @Body() requestBody: UserSignUpRequest
    ): Promise<ApiResponse<UserSignUpResponse>> {
        console.log("회원가입을 요청했습니다!");
        console.log("body:", requestBody);

        if (!requestBody.email || !requestBody.name || !requestBody.phoneNumber) {
        throw new AppError({
        errorCode: "INVALID_REQUEST",
        message: "유효하지 않은 요청값입니다.",
        statusCode: 404
    });
}
       
        const user = await userSignUp(requestBody);

     
        return success(user);
           
        
    }
    /**
     * 게스트 페이지
     */

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
  /**
     * 로그인 페이지 (리다이렉트 전용)
     */
  @Get("login")
  public async handleLoginPage(): Promise<String> {
    return "<h1>로그인 페이지</h1><p>로그인이 필요한 페이지에서 튕겨나오면 여기로 옵니다.</p>";
  }
  /**
     * 마이페이지 (인증 필요)
     */
  @Get("mypage")
  @Middlewares(authorizeUser())
  public async handleMypage(@Request() req: ExpressRequest): Promise<String> {
    return `
            <h1>마이페이지</h1>
            <p>환영합니다, ${req.cookies.username}님!</p>
            <p>이 페이지는 로그인한 사람만 볼 수 있습니다.</p>
        `;
  }
  /**
     * 로그인 쿠키 생성 테스트
     */
  @Get("set-login")
  public async handleSetLogin(@Request() req: ExpressRequest): Promise<String> {
    req.res!.cookie("username", "UMC10th", { maxAge: 3600000 });
    return '로그인 쿠키(username=UMC9th) 생성 완료! <a href="/api/v1/users/mypage">마이페이지로 이동</a>';
  }

  /**
     * 로그아웃 (쿠키 삭제)
     */
  @Get("set-logout")
  public async handleSetLogout(
    @Request() req: ExpressRequest,
  ): Promise<String> {
    req.res!.clearCookie("username");
    return '로그아웃 완료 (쿠키 삭제). <a href="/api/v1/users/guest">메인으로</a>';
  }
}

