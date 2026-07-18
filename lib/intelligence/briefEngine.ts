import type { AtlasMemory } from "./memory/types";
import { normalizeAtlasMemory } from "./memory/memoryEngine";
import type { AtlasSnapshot } from "./types";

export type AtlasExecutiveBrief = {
  greeting: string;
  headline: string;
  summary: string;
  priorityStatement: string;
  riskStatement: string;
  closingStatement: string;
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function createGreeting(ownerName: string): string {
  const hour = new Date().getHours();

  if (hour < 12) {
    return `Good morning, ${ownerName}.`;
  }

  if (hour < 18) {
    return `Good afternoon, ${ownerName}.`;
  }

  return `Good evening, ${ownerName}.`;
}

export function createAtlasExecutiveBrief(
  snapshot: AtlasSnapshot,
  memory?: AtlasMemory | null
): AtlasExecutiveBrief {
  const atlasMemory = normalizeAtlasMemory(memory);

  const actionCount =
    snapshot.metrics.waitingCustomers +
    snapshot.metrics.followUpCustomers;

  const priorityCustomer =
    snapshot.topPriority.customer;

  const greeting = createGreeting(
    atlasMemory.ownerName
  );

  const headline =
    actionCount === 0
      ? "Your business is under control."
      : `${actionCount} customer action${
          actionCount === 1 ? "" : "s"
        } deserve attention.`;

  const priorityStatement =
    `${snapshot.topPriority.recommendedAction} ` +
    `${priorityCustomer.service || "Their request"} represents approximately ` +
    `${formatCurrency(
      snapshot.topPriority.estimatedValue
    )}.`;

  const riskStatement =
    snapshot.revenueAtRisk > 0
      ? `${formatCurrency(
          snapshot.revenueAtRisk
        )} is currently at risk across waiting and follow-up opportunities.`
      : "No active customer revenue is currently marked at risk.";

  let summary: string;

  if (
    atlasMemory.preferredBriefLength === "short"
  ) {
    summary =
      `${snapshot.businessHealthSummary} ` +
      priorityStatement;
  } else if (
    atlasMemory.preferredBriefLength === "detailed"
  ) {
    summary =
      `${snapshot.businessHealthSummary} ` +
      `Business Health is ${snapshot.businessHealth} out of 100. ` +
      `The active pipeline is ${formatCurrency(
        snapshot.forecast.pipeline
      )}, with expected revenue of ${formatCurrency(
        snapshot.forecast.expectedRevenue
      )}. ` +
      priorityStatement;
  } else {
    summary =
      `${snapshot.businessHealthSummary} ` +
      `The active pipeline is ${formatCurrency(
        snapshot.forecast.pipeline
      )}. ` +
      priorityStatement;
  }

  const closingStatement =
    actionCount === 0
      ? "Everything important is handled."
      : "Complete the first recommendation, then let Atlas guide the next move.";

  return {
    greeting,
    headline,
    summary,
    priorityStatement,
    riskStatement,
    closingStatement,
  };
}