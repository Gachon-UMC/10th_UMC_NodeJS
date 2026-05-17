import { prisma } from "../../../db.config.js";

export const getAllStoreReviews = async (storeId: number, take: number, cursor?: number) => {
  const reviews = await prisma.userStoreReview.findMany({
    
    take: take,                               
    skip: cursor ? 1 : 0,                      
    cursor: cursor ? { id: cursor } : undefined, 
    
    select: {
      id: true,
      body: true,
      score: true,
      storeId: true,
      userId: true,
      createdAt: true, 
      images: true,    
      reply: true,
      
      store: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
    },

    
    where: {
      storeId: storeId,
    },

    
    orderBy: {
      id: "desc",
    },
  });

  return reviews;
};


export const getUserReviews = async (userId: number, take: number, cursor?: number) => {
    return await prisma.userStoreReview.findMany({
        where: { userId: userId },
        take,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor } : undefined,
       
        include: {
            store: true,  
            user: true,   
            images: true, 
            reply: true,  
        },
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }]
    });
};

