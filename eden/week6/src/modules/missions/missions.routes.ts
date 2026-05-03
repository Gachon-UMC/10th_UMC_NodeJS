import { Router } from "express";
import { handleAddMission, handleChallengeMission, handleListStoreMissions, handleListUserMissions } from "./controllers/mission.controller.js";

const missionsRouter = Router();


//미션 추가
missionsRouter.post("/missions/:storeId", handleAddMission);
//미션 목록 조회
missionsRouter.get("/missions/stores/:storeId", handleListStoreMissions);
// 유저한테 미션 도전
missionsRouter.post("/missions/users/:userId/:missionId", handleChallengeMission);
//내가 진행중인 미션 목록
missionsRouter.get("/missions/users/:userId", handleListUserMissions);

export default missionsRouter;
