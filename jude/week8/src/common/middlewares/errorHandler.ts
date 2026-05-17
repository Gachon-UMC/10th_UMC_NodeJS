import { Request, Response, NextFunction } from "express";
import { AppError } from "../../common/errors/app.error.js";


export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  console.error(`[ERROR LOG] ${err.message}`);

 
  if (err instanceof AppError || (err as any).errorCode) { 
    return res.status((err as any).statusCode || 400).json({
        success: false,
        errorCode: (err as any).errorCode,
        message: err.message,
        data: (err as any).data,
    },
  );
    
  }

 
  if ((err as any).status === 400 && (err as any).fields) {
    return res.status(400).json({
      success: false,
      message: "입력값 검증 실패",
      errors: (err as any).fields,
    });
  }

 
  return res.status(500).json({
    success: false,
    message: "서버 내부 에러가 발생했습니다.",
  });
};