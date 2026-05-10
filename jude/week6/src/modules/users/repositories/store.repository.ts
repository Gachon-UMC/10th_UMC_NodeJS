import { prisma } from "../../../db.config.js";

export const getAllStoreReviews = async (
    storeId: number,
    cursor: number 
  ) => {
    const reviews = await prisma.userStoreReview.findMany({
      select: {
        id: true,
        content: true,
        store: true,
        user: true,
      },
      where: {
        storeId,
        id: {
          gt: cursor,
        },
      },
      orderBy: {
        id: "asc",
      },
      take: 5,
    });
  
    return reviews;
  };

  
