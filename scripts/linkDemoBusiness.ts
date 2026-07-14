import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaBetterSqlite3({
  url:
    process.env.DATABASE_URL ??
    "file:./prisma/dev.db",
});

const prisma = new PrismaClient({
  adapter,
});

/*
 * This is the Clerk organization ID shown in your Clerk dashboard.
 */
const clerkOrganizationId =
  "org_3GRKYwdB1NmI13Vnc0LXJCwPjCL";

const demoBusinessId = "business-embur-demo";
const accidentalBusinessId =
  "cmrjoraj90000rwt0rccbpcc2";

async function main() {
  const demoBusiness =
    await prisma.business.findUnique({
      where: {
        id: demoBusinessId,
      },
    });

  if (!demoBusiness) {
    throw new Error(
      "The seeded Mike's Heating & Air business was not found."
    );
  }

  /*
   * Disconnect the Clerk organization from any other
   * business before assigning it to the demo business.
   */
  await prisma.business.updateMany({
    where: {
      clerkOrganizationId,
      id: {
        not: demoBusinessId,
      },
    },
    data: {
      clerkOrganizationId: null,
    },
  });

  await prisma.business.update({
    where: {
      id: demoBusinessId,
    },
    data: {
      clerkOrganizationId,
    },
  });

  /*
   * Remove only the accidental empty business.
   */
  const accidentalBusiness =
    await prisma.business.findUnique({
      where: {
        id: accidentalBusinessId,
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

  if (
    accidentalBusiness &&
    accidentalBusiness._count.users === 0 &&
    accidentalBusiness._count.customers === 0 &&
    accidentalBusiness._count.conversations === 0
  ) {
    await prisma.business.delete({
      where: {
        id: accidentalBusinessId,
      },
    });
  }

  const result =
    await prisma.business.findUnique({
      where: {
        id: demoBusinessId,
      },
      include: {
        customers: true,
        conversations: true,
      },
    });

  console.log("");
  console.log("🔥 Clerk organization linked successfully.");
  console.log(`Business: ${result?.name}`);
  console.log(
    `Clerk organization: ${result?.clerkOrganizationId}`
  );
  console.log(
    `Customers: ${result?.customers.length ?? 0}`
  );
  console.log(
    `Conversations: ${result?.conversations.length ?? 0}`
  );
  console.log("");
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });