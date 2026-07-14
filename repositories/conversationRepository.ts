import { prisma } from "@/lib/prisma";

export function findConversationCustomersForBusiness(
  businessId: string
) {
  return prisma.customer.findMany({
    where: {
      businessId,

      conversations: {
        some: {},
      },
    },

    include: {
      conversations: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },

    orderBy: {
      updatedAt: "desc",
    },
  });
}