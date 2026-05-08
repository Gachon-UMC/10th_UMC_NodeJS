import { Router } from "express";
import { RegisterRoutes } from "../generated/routes.js";

const router = Router();
RegisterRoutes(router);

export default router;
