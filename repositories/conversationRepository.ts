import { prisma } from "@/lib/prisma";

const demoBusinessId = "business-embur-demo";

export function findDemoConversationCustomers() {
  return prisma.customer.findMany({
    where: {
      businessId: demoBusinessId,

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