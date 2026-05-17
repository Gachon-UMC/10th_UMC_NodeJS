import { StatusCodes } from "http-status-codes";
import { AppError } from "../../../common/errors.js";
import { responseFromUser, UserSignUpRequest } from "../dtos/user.dto.js"; //인터페이스 가져오기

import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import { DuplicateUserEmailError } from "../../../common/customError.js";

export const userSignUp = async (data: UserSignUpRequest) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const joinUserId = await addUser({
    email: data.email,
    password: hashedPassword,
    name: data.name,
    gender: data.gender,
    birthDate: new Date(data.birthDate),
    address: data.address,
    phoneNumber: data.phoneNumber,
  });

  // 이메일 중복
  if (joinUserId === null) {
    throw new DuplicateUserEmailError(data);
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};
