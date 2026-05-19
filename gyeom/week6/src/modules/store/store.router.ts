import { Router } from "express";
import { handleAddStore } from "./controller/store.controller.js";

const router = Router();

router.post("/", handleAddStore);

export default router;
