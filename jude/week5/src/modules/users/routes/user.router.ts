import { Router } from "express";
import { handleUserSignUp } from "../controllers/user.controller.js";

const router = Router();

router.get("/signup", handleUserSignUp);

export default router;