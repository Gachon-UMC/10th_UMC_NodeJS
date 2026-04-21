import { UserSignUpRequest } from "../dtos/user.dto.js"; //인터페이스 가져오기
import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";
import bcrypt from "bcrypt";

export const userSignUp = async (data: UserSignUpRequest) => {
  // 이메일 형식 검사
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    const err = new Error("올바르지 않은 이메일 형식입니다.");
    (err as any).statusCode = 400;
    throw err;
  }

  // 비밀번호 형식 검사
  if (!data.password || data.password.length < 6) {
    const err = new Error("비밀번호는 6자 이상이어야 합니다.");
    (err as any).statusCode = 400;
    throw err;
  }

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
    const err = new Error("이미 존재하는 이메일입니다.");
    (err as any).statusCode = 409;
    throw err;
  }

  // preference 없을 때 방어
  if (!data.preferences || data.preferences.length === 0) {
    const err = new Error("선호 카테고리를 최소 1개 선택해야 합니다.");
    (err as any).statusCode = 400;
    throw err;
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};
