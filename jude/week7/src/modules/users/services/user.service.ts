import { prisma } from "../../../db.config.js";
import { type UserSignUpRequest } from "../dtos/user.dto.js"; //인터페이스 가져오기 
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  

} from "../repositories/user.repository.js";
;
import { DuplicateUserEmailError } from "../../../../src/common/errors/app.error.js";


export const userSignUp = async (data: UserSignUpRequest) => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: new Date(data.birth), // 문자열을 Date 객체로 변환해서 넘겨줍니다. 
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
  });

    if (joinUserId === null) {
    
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);
  const preferCategory = preferences.map((p) => p.foodCategory.name);

  return {
    email: user.email,
    name: user.name,
    preferCategory: preferCategory,
  };
};


