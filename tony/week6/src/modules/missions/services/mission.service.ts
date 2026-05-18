import {AppError} from "../../../common/errors/app.error.js"
import { ChallengeMissionRequest } from "../dtos/mission.dto.js";
import {
  addUserMission,
  getMissionById,
  getUserMission,
} from "../repositories/mission.repository.js";

export const challengeMission = async (
  missionId: number,
  data: ChallengeMissionRequest
) => {
  const mission = await getMissionById(missionId);

  if (!mission) {
    throw new AppError({
      errorCode: "MISSION_NOT_FOUND",
      message: "존재하지 않는 미션입니다.",
      statusCode: 404
    });
  }

  const userMission = await getUserMission(
    data.userId,
    missionId
  );

  if (userMission) {
    throw new AppError({
      errorCode: "ALREADY_CHALLENGING_MISSION",
      message: "이미 도전 중인 미션입니다.",
      statusCode: 409
    });
  }

  const result = await addUserMission(data.userId, missionId);
  
  return result;
};