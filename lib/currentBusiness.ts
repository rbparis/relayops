import { clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

const demoBusinessId = "business-embur-demo";

export async function getOrCreateBusinessForOrganization(
  clerkOrganizationId: string
) {
  const linkedBusiness = await prisma.business.findUnique({
    where: {
      clerkOrganizationId,
    },
    include: {
      _count: {
        select: {
          users: true,
          customers: true,
          conversations: true,
        },
      },
    },
  });

  const demoBusiness = await prisma.business.findUnique({
    where: {
      id: demoBusinessId,
    },
    include: {
      _count: {
        select: {
          users: true,
          customers: true,
          conversations: true,
        },
      },
    },
  });

  /*
   * If the correct seeded business is already connected,
   * no repair is needed.
   */
  if (
    linkedBusiness &&
    linkedBusiness.id === demoBusinessId
  ) {
    return linkedBusiness;
  }

  /*
   * During local development, connect the active Clerk
   * company to the seeded business containing our demo data.
   */
  if (
    demoBusiness &&
    demoBusiness._count.customers > 0
  ) {
    return prisma.$transaction(async (transaction) => {
      /*
       * Release the active organization ID from the accidental
       * empty Business record.
       */
      if (linkedBusiness) {
        if (
          linkedBusiness._count.users === 0 &&
          linkedBusiness._count.customers === 0 &&
          linkedBusiness._count.conversations === 0
        ) {
          await transaction.business.delete({
            where: {
              id: linkedBusiness.id,
            },
          });
        } else {
          await transaction.business.update({
            where: {
              id: linkedBusiness.id,
            },
            data: {
              clerkOrganizationId: null,
            },
          });
        }
      }

      /*
       * Clear any stale Clerk organization mapping from the
       * seeded business before assigning the active one.
       */
      await transaction.business.update({
        where: {
          id: demoBusinessId,
        },
        data: {
          clerkOrganizationId: null,
        },
      });

      return transaction.business.update({
        where: {
          id: demoBusinessId,
        },
        data: {
          clerkOrganizationId,
        },
      });
    });
  }

  /*
   * Normal production behavior for a genuinely new company.
   */
  if (linkedBusiness) {
    return linkedBusiness;
  }

  const client = await clerkClient();

  const organization =
    await client.organizations.getOrganization({
      organizationId: clerkOrganizationId,
    });

  return prisma.business.create({
    data: {
      clerkOrganizationId,
      name: organization.name,
    },
  });
}