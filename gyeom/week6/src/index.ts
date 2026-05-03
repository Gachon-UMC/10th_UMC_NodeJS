import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import routes from "./routes/routes.index.js";

// bigint json 직렬화 오류로 인해 추가
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

// 1. 환경 변수 설정
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// 2. 미들웨어 설정
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 3. 기본 라우트
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! This is TypeScript Server!");
});

app.use("/", routes);

// 4. 서버 시작
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
