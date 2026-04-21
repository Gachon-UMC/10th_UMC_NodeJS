import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("Error:", err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: err.message || "서버 오류가 발생했습니다.",
    data: null,
  });
};

export default errorHandler;
