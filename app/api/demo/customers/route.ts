import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateBusinessForOrganization } from "@/lib/currentBusiness";

function formatOpportunityValue(value: number | null) {
  const amount = value ?? 0;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export async function GET() {
  const {
    isAuthenticated,
    orgId,
  } = await auth();

  if (!isAuthenticated) {
    return NextResponse.json(
      {
        success: false,
        source: "prisma",
        customers: [],
        message: "You must sign in.",
      },
      {
        status: 401,
      }
    );
  }

  if (!orgId) {
    return NextResponse.json(
      {
        success: false,
        source: "prisma",
        customers: [],
        message:
          "Select a company before loading customer data.",
      },
      {
        status: 409,
      }
    );
  }

  try {
    const business =
      await getOrCreateBusinessForOrganization(orgId);

    const customers = await prisma.customer.findMany({
      where: {
        businessId: business.id,
      },
      orderBy: [
        {
          createdAt: "asc",
        },
        {
          name: "asc",
        },
      ],
    });

    const customerViewModels = customers.map(
      (customer, index) => ({
        id: index + 1,
        name: customer.name,
        service:
          customer.service?.trim() || "Service Request",
        status: customer.status,
        value: formatOpportunityValue(
          customer.estimatedValue
        ),
      })
    );

    return NextResponse.json({
      success: true,
      source: "prisma",
      business: {
        id: business.id,
        name: business.name,
      },
      customers: customerViewModels,
    });
  } catch (error) {
    console.error(
      "Failed to load EMBUR customers:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        source: "prisma",
        customers: [],
        message:
          "The customer database could not be loaded.",
      },
      {
        status: 500,
      }
    );
  }
}