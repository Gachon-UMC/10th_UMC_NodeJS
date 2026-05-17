import { Router } from "express";
import { handleUserSignUp } from "../modules/users/controllers/user.controller.js";

const router = Router();

router.post("/signup", handleUserSignUp);

export default router;
