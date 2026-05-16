import dotenv from "dotenv";
import express, { type Express, type Request, type Response, type NextFunction} from "express";
import cors from "cors";
import { RegisterRoutes } from "./generated/routes.js";
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { errorHandler } from "./common/middlewares/errorHandler.js";


dotenv.config();


const port = process.env.PORT || 3000;
const app = express();
app.use(morgan("dev")); // 로그 포맷: dev
app.use(cookieParser());
app.use(cors()); 
app.use(express.static('public')); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
RegisterRoutes(app); 
app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! This is TypeScript Server!");
});

app.get('/test', (req, res) => {
  res.send('Hello!');
});

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


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
