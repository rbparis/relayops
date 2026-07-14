import Stripe from "stripe";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type StripeObjectWithId =
  | Stripe.Customer
  | Stripe.DeletedCustomer
  | Stripe.Subscription;

function getStripeId(
  value: string | StripeObjectWithId | null
) {
  if (!value) {
    return null;
  }

  return typeof value === "string"
    ? value
    : value.id;
}

function getCurrentPeriodEndsAt(
  subscription: Stripe.Subscription
) {
  const periodEnd =
    subscription.items.data[0]?.current_period_end;

  return periodEnd
    ? new Date(periodEnd * 1000)
    : null;
}

async function syncSubscription(
  subscription: Stripe.Subscription
) {
  const businessId =
    subscription.metadata.businessId;

  const stripeCustomerId =
    getStripeId(subscription.customer);

  const updateData = {
    stripeCustomerId,
    stripeSubscriptionId: subscription.id,
    subscriptionStatus: subscription.status,
    currentPeriodEndsAt:
      getCurrentPeriodEndsAt(subscription),
  };

  if (businessId) {
    await prisma.business.updateMany({
      where: {
        id: businessId,
      },
      data: updateData,
    });

    return;
  }

  if (stripeCustomerId) {
    await prisma.business.updateMany({
      where: {
        stripeCustomerId,
      },
      data: updateData,
    });
  }
}

export async function POST(request: Request) {
  const signature = request.headers.get(
    "stripe-signature"
  );

  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      {
        received: false,
        message:
          "Stripe webhook configuration is missing.",
      },
      {
        status: 400,
      }
    );
  }

  const payload = await request.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret
    );
  } catch (error) {
    console.error(
      "Stripe webhook signature verification failed:",
      error
    );

    return NextResponse.json(
      {
        received: false,
        message: "Invalid Stripe signature.",
      },
      {
        status: 400,
      }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session =
          event.data.object as Stripe.Checkout.Session;

        const businessId =
          session.metadata?.businessId ??
          session.client_reference_id;

        const stripeCustomerId =
          getStripeId(session.customer);

        const stripeSubscriptionId =
          getStripeId(session.subscription);

        if (businessId) {
          await prisma.business.updateMany({
            where: {
              id: businessId,
            },
            data: {
              stripeCustomerId,
              stripeSubscriptionId,
              subscriptionStatus:
                session.payment_status === "paid"
                  ? "active"
                  : "processing",
            },
          });
        }

        if (stripeSubscriptionId) {
          const subscription =
            await stripe.subscriptions.retrieve(
              stripeSubscriptionId
            );

          await syncSubscription(subscription);
        }

        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription =
          event.data.object as Stripe.Subscription;

        await syncSubscription(subscription);

        break;
      }

      case "invoice.payment_failed": {
        const invoice =
          event.data.object as Stripe.Invoice;

        const stripeCustomerId =
          getStripeId(invoice.customer);

        if (stripeCustomerId) {
          await prisma.business.updateMany({
            where: {
              stripeCustomerId,
            },
            data: {
              subscriptionStatus: "past_due",
            },
          });
        }

        break;
      }

      default:
        console.log(
          `Unhandled Stripe event: ${event.type}`
        );
    }

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    console.error(
      `Failed to process Stripe event ${event.type}:`,
      error
    );

    return NextResponse.json(
      {
        received: false,
        message:
          "Stripe event processing failed.",
      },
      {
        status: 500,
      }
    );
  }
}