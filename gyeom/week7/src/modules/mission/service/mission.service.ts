import { MissionAddRequest, MissionAddResponse, MissionListResponse } from "../dto/mission.dto.js";
import { addMission, getMission, getStoreMissions } from "../repository/mission.repository.js";
import { getStore } from "../../store/repository/store.repository.js";
import { AppError } from "../../../common/errors/app.error.js";
import { StatusCodes } from "http-status-codes";

export const missionAdd = async (
  storeId: number,
  data: MissionAddRequest
): Promise<MissionAddResponse> => {

  const store = await getStore(storeId);

  if (!store) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "존재하지 않는 가게입니다."
    );
  }

  const mission = await addMission({
    storeId,
    content: data.content,
    rewardPoint: data.rewardPoint,
    deadline: data.deadline || null,
  });

  const missionData = await getMission(Number(mission.id));

  return {
    id: Number(missionData?.id),
    storeId: Number(missionData?.storeId),
    content: missionData?.content ?? "",
    rewardPoint: Number(missionData?.rewardPoint),
    deadline: missionData?.deadline
      ? Number(missionData.deadline)
      : null,
  };
};


export const storeMissionList = async (
  storeId: number,
  cursor?: number
): Promise<MissionListResponse> => {

  const store = await getStore(storeId);

  if (!store) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "존재하지 않는 가게입니다."
    );
  }

  const missions = await getStoreMissions(
    BigInt(storeId),
    cursor
  );

  return {
    missions: missions.map((mission) => ({
      id: Number(mission.id),
      storeId: Number(mission.storeId),
      content: mission.content,
      rewardPoint: Number(mission.rewardPoint),
      deadline: mission.deadline
        ? Number(mission.deadline)
        : null,
    })),
  };
};