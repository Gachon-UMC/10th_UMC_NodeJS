import bcrypt from "bcrypt";
import {
  UserSignUpRequest,
  UserSignUpResponse,
} from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";
import { DuplicateUserEmailError } from "../../../common/errors/error.js";
export const userSignUp = async (
  data: UserSignUpRequest
): Promise<UserSignUpResponse> => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const joinUserId = await addUser({
    password: hashedPassword,
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: new Date(data.birth),
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

  return {
    email: user!.email,
    name: user!.name,
    preferCategory: preferences.map((p: any) => p.name),
  };
};