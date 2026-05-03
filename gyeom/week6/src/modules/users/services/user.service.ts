import { UserSignUpRequest, UserMissionAddRequest, bodyToUserMission, responseFromUserMission, responseFromUserMissions } from "../dtos/user.dto.js"; //인터페이스 가져오기 
import { responseFromUser } from "../dtos/user.dto.js";
import {
  // addUser,
  // getUser,
  // getUserPreferencesByUserId,
  // setPreference,
  addUserMission, getUserMission, getUserMissionById, getUserMissions
  , updateUserMissionStatus
} from "../repositories/user.repository.js";
import { getMission } from "../../mission/repository/mission.repository.js";
// import bcrypt from "bcrypt";



// export const userSignUp = async (data: UserSignUpRequest) => {

//   const hashedPassword = await bcrypt.hash(data.password, 10);

//   const joinUserId = await addUser({
//     email: data.email,
//     name: data.name,
//     gender: data.gender,
//     birth: new Date(data.birth),
//     address: data.address,
//     detailAddress: data.detailAddress,
//     phoneNumber: data.phoneNumber,
//     password: hashedPassword, 
//   });

//   if (joinUserId === null) {
//     throw new Error("이미 존재하는 이메일입니다.");
//   }

//   for (const preference of data.preferences) {
//     await setPreference(joinUserId, preference);
//   }

//   const user = await getUser(joinUserId);
//   const preferences = await getUserPreferencesByUserId(joinUserId);
//   return responseFromUser({ user, preferences });
// };

export const userMissionAdd = async (userId: number, data: UserMissionAddRequest) => {
  const mission = await getMission(data.missionId);
  if (!mission) {
    throw new Error("존재하지 않는 미션입니다.");
  }

  const existing = await getUserMission(userId, data.missionId);
  if (existing) {
    throw new Error("이미 도전 중인 미션입니다.");
  }

const userMission = await addUserMission(bodyToUserMission(userId, data));
const userMissionData = await getUserMissionById(Number(userMission.id));
  return responseFromUserMission({ userMission: userMissionData });
};

export const userMissionList = async (userId: number, status?: string) => {
  const userMissions = await getUserMissions(BigInt(userId), status);
  return responseFromUserMissions({ userMissions });
};

export const userMissionComplete = async (userId: number, missionId: number) => {
  const existing = await getUserMission(userId, missionId);
  if (!existing) {
    throw new Error("진행 중인 미션이 아닙니다.");
  }
  return await updateUserMissionStatus(BigInt(userId), BigInt(missionId));
};