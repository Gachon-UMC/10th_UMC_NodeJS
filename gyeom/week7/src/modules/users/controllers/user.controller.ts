import { Body, Controller, Get, Patch, Path, Post, Queries, Route, Tags, Middlewares, Request } from "tsoa";
import { UserMissionAddRequest,UserMissionAddResponse, UserMissionListResponse,UserMissionCompleteResponse, UserMissionAddApiResponse, UserMissionListApiResponse, UserMissionCompleteApiResponse } from "../dtos/user.dto.js";
import { userMissionAdd, userMissionList, userMissionComplete } from "../services/user.service.js";
import { ApiResponse, success } from "../../../common/responses/response.js";
import { StatusCodes } from "http-status-codes";
import { authorizeUser } from "../../../common/middlewares/auth.middleware.js";
import { Request as ExpressRequest } from "express";
import { AppError } from "../../../common/errors/app.error.js";

interface UserMissionListQuery {
  cursor?: number;
}

@Route("users")
@Tags("Users")
export class UserController extends Controller {
  @Post("{userId}/missions")
  public async handleAddUserMission(
    @Path() userId: number,
    @Body() body: UserMissionAddRequest,
  ): Promise<ApiResponse<UserMissionAddResponse>> {
    try {
      const userMission = await userMissionAdd(userId, body);
      return success(StatusCodes.OK, "미션 도전 성공", userMission);
    } catch (err) {
      if (err instanceof AppError) {
        throw err;
      }

      throw new AppError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        (err as Error).message || "서버 내부 오류"
      );
    }
  }

  @Get("{userId}/missions")
  public async handleGetUserMissions(
    @Path() userId: number,
    @Queries() query: UserMissionListQuery,
  ): Promise<ApiResponse<UserMissionListResponse>> {
    try {
      const userMissions = await userMissionList(userId, query.cursor);
      return success(StatusCodes.OK, "미션 목록 조회 성공", userMissions);
    } catch (err) {
      if (err instanceof AppError) {
        throw err;
      }

      throw new AppError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        (err as Error).message || "서버 내부 오류"
      );
    }
  }

  @Patch("{userId}/missions/{missionId}")
  public async handleCompleteUserMission(
    @Path() userId: number,
    @Path() missionId: number,
  ): Promise<ApiResponse<UserMissionCompleteResponse>> {
    try {
      const result = await userMissionComplete(userId, missionId);
      return success(StatusCodes.OK, "미션 완료 성공", result);
    } catch (err) {
      if (err instanceof AppError) {
        throw err;
      }

      throw new AppError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        (err as Error).message || "서버 내부 오류"
      );
    }
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
    return '로그인 쿠키(username=UMC10th) 생성 완료! <a href="/api/v1/users/mypage">마이페이지로 이동</a>';
  }
  @Get("set-logout")
  public async handleSetLogout(
    @Request() req: ExpressRequest,
  ): Promise<String> {
    req.res!.clearCookie("username");
    return '로그아웃 완료 (쿠키 삭제). <a href="/api/v1/users/guest">메인으로</a>';
  }
}
