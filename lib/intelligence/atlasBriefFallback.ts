import type { AtlasMemory } from "@/lib/intelligence/memory/types";
import type { AtlasSnapshot } from "@/lib/intelligence/types";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

function getGreeting(): string {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 18) {
    return "Good afternoon";
  }

  return "Good evening";
}

export function buildDeterministicAtlasBrief(
  snapshot: AtlasSnapshot,
  memory?: AtlasMemory | null
): string {
  const ownerName =
    memory?.ownerName?.trim() || "Owner";

  const topPriority = snapshot.topPriority;
  const customer = topPriority.customer;

  const waitingCustomers =
    snapshot.metrics.waitingCustomers;

  const followUpCustomers =
    snapshot.metrics.followUpCustomers;

  const revenueAtRisk =
    snapshot.revenueAtRisk;

  const expectedRevenue =
    snapshot.forecast.expectedRevenue;

  const firstAction =
    topPriority.recommendedAction?.trim() ||
    `Review ${customer.name}'s request`;

  const reason =
    topPriority.reason?.trim() ||
    "it is currently the highest-priority opportunity";

  const nextStep =
    snapshot.recommendations.length > 1
      ? `After that, Atlas has ${
          snapshot.recommendations.length - 1
        } additional ${
          snapshot.recommendations.length - 1 === 1
            ? "action"
            : "actions"
        } ready for review.`
      : "After that, continue monitoring new customer activity.";

  return [
    `${getGreeting()}, ${ownerName}.`,
    `Your business health is ${snapshot.businessHealth} out of 100.`,
    `${formatCurrency(
      revenueAtRisk
    )} is currently at risk, with ${waitingCustomers} ${
      waitingCustomers === 1
        ? "customer"
        : "customers"
    } waiting and ${followUpCustomers} ${
      followUpCustomers === 1
        ? "follow-up"
        : "follow-ups"
    } ready.`,
    `Your first action is to ${firstAction} for ${customer.name} because ${reason}.`,
    `Atlas estimates this opportunity at ${formatCurrency(
      topPriority.estimatedValue
    )} with ${topPriority.confidence}% confidence.`,
    `${nextStep}`,
    `The current pipeline is expected to produce approximately ${formatCurrency(
      expectedRevenue
    )}.`,
  ].join(" ");
}