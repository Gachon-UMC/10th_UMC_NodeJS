import swaggerUi from "swagger-ui-express";
import path from "path";
import fs from "fs";

import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import { RegisterRoutes } from "./generated/routes.js";
import {AppError} from "./common/errors/app.error.js";
// 1. 환경 변수 설정
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;


// 2. 미들웨어 설정
app.use((req: Request, res: Response, next: NextFunction) => {
  (res as any).error = function ({
    errorCode = null,
    message = null,
    data = null,
  }) {
    return this.json({
      resultType: "FAILED",
      error: {
        errorCode,
        message,
        data,
      },
      data: null,
    });
  };

  next();
});
app.use(cors());            // cors 방식 허용                 
app.use(express.static('public'));    // 정적 파일 접근      
app.use(express.json());              // request의 본문을 json으로 해석할 수 있도록 함(JSON 형태의 요청 body를 파싱하기 위함)     
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석
app.use(morgan("dev"));
app.use(cookieParser());

const swaggerFile = JSON.parse(
  fs.readFileSync(path.resolve("dist/swagger.json"), "utf8")
);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// 3. 기본 라우트
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! This is TypeScript Server!");
});

//Tsoa 자동 생성 라우트 연결
const router = express.Router();
RegisterRoutes(router);
app.use("/api/v1", router);

app.use(
  (err: AppError, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(err);
    }

    (res.status(err.statusCode || 500) as any).error({
      errorCode: err.errorCode || "unknown",
      message: err.message || null,
      data: err.data || null,
    });
  }
);


// 4. 서버 시작
app.listen(port, () => {
  console.log(`[server]: Server is running at <http://localhost>:${port}`);
});

