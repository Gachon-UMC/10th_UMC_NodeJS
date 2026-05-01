import { Router } from "express";
import { handleUserSignUp, handleChallengeMission } from "./controllers/user.controllers.js";

const usersRouter = Router();

// /api/v1/users/signup
usersRouter.post("/users/signup", handleUserSignUp);

// /api/v1/users/:userId/missions/:missionId
usersRouter.post("/users/:userId/missions/:missionId", handleChallengeMission);

export default usersRouter;