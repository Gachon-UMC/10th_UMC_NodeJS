import dotenv from "dotenv";
import express, {
  Request,
  Response,
  NextFunction,
} from "express";
import cors from "cors";
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { RegisterRoutes } from "./generated/routes.js";
import { AppError } from "./common/errors/app.error.js";
// bigint json 직렬화 오류로 인해 추가
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};


// 1. 환경 변수 설정
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev')); 
app.use(cookieParser()); 


// 2. 미들웨어 설정
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 3. 기본 라우트
app.get("/", (req, res) => {
  res.send("Hello World! This is TypeScript Server!");
});

const router = express.Router();
RegisterRoutes(router); 
app.use("/api/v1", router);
app.use(
  (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error(err);

    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        success: false,
        statusCode: err.statusCode,
        message: err.message,
        data: null,
      });
    }

    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "서버 내부 오류",
      data: null,
    });
  }
);


// 쿠키 만드는 라우터 
app.get('/setcookie', (req, res) => {
    // 'myCookie'라는 이름으로 'hello' 값을 가진 쿠키를 생성
    res.cookie('myCookie', 'hello', { maxAge: 60000 }); // 60초간 유효
    res.send('쿠키가 생성되었습니다!');
});

// 쿠키 읽는 라우터 
app.get('/getcookie', (req, res) => {
    // cookie-parser 덕분에 req.cookies 객체에서 바로 꺼내 쓸 수 있음
    const myCookie = req.cookies.myCookie; 
    
    if (myCookie) {
        console.log(req.cookies); // { myCookie: 'hello' }
        res.send(`당신의 쿠키: ${myCookie}`);
    } else {
        res.send('쿠키가 없습니다.');
    }
});

// 4. 서버 시작
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
