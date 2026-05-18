import { Request, Response } from "express";
import { createReview } from "../services/store.service.js";

export const handleAddReview = async (req: Request, res: Response) => {
  const storeId = Number(req.params.storeId);

  await createReview(storeId, req.body);

  res.status(200).json({
    message: "리뷰 등록 완료",
  });
};

import { createMission } from "../services/store.service.js";

export const handleAddMission = async (req: Request, res: Response) => {
  const storeId = Number(req.params.storeId);

  await createMission(storeId, req.body);

  res.status(200).json({
    message: "미션 등록 완료",
  });
};