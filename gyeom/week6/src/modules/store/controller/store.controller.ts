import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { storeAdd 
  // , listStoreReviews
} from "../service/store.service.js";
import { responseFromStore, StoreAddRequest , bodyToStore} from "../dto/store.dto.js";
export const handleAddStore = async (req: Request, res: Response) => {
  console.log("가게 추가 요청");
  console.log("body:", req.body);
  const store = await storeAdd(req.body as StoreAddRequest);
  res.status(StatusCodes.OK).json({ result: store });
};

// export const handleListStoreReviews = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const storeId = parseInt(req.params.storeId as string, 10);
//     const cursor =
//     typeof req.query.cursor === "string"
//       ? parseInt(req.query.cursor, 10)
//       : 0;

//     const reviews = await listStoreReviews(storeId, cursor);

//     res.status(StatusCodes.OK).json(reviews);
//   } catch (err) {
//     next(err);
//   }
// };