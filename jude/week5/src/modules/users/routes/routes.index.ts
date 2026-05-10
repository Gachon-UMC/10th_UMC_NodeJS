import { Router } from "express";
import userRouter from "./user.router.js";

const routers = Router();

routers.use("/api/users", userRouter);

export default routers;