
import { prisma } from "../../../db.config.js";
import { DuplicateUserEmailError } from "../../../../src/common/errors/app.error.js";

export const addUser = async (data: any) => {
    // 1. 피드백 반영: findUnique를 사용하여 성능 최적화 및 가독성 향상
    // findUnique는 @unique나 @id가 설정된 필드로만 조회가 가능합니다.
    const existingUser = await prisma.user.findUnique({
        where: { 
            email: data.email 
        }
    });

    // 중복된 이메일이 있는 경우 예외 처리
    if (existingUser) {
        throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
    }

  
  const created = await prisma.user.create({ 
    data: {
      email: data.email,
      name: data.name,
      gender: data.gender,
      birth: data.birth,
      address: data.address,
      detailAddress: data.detailAddress,
      phoneNumber: data.phoneNumber,
    } 
  });

  return created.id;
};


export const getUser = async (userId: number) => {
  return await prisma.user.findUniqueOrThrow({ where: { id: userId } });
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId: number, foodCategoryId: number) => {
  await prisma.userFavorCategory.create({
    data: {
      userId: userId,
      foodCategoryId: foodCategoryId,
    },
  });
};

// 사용자 선호 카테고리 반환 (JOIN)
export const getUserPreferencesByUserId = async (userId: number) => {
  return await prisma.userFavorCategory.findMany({
    where: { userId: userId },
    include: {
      foodCategory: true, // 💡 핵심: JOIN 대신 include를 써서 연관 데이터를 가져옵니다!
    },
    orderBy: { foodCategoryId: "asc" },
  });
};







