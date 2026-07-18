import type { Lead } from "@/types";
import {
  parseLeadValue,
  scoreCustomer,
} from "../scoreCustomer";
import {
  getCustomerRiskLevel,
  getRecommendedAction,
} from "../recommendationEngine";
import type { AtlasPriority } from "../types";
import type { AtlasMemory } from "../memory/types";
import { normalizeAtlasMemory } from "../memory/memoryEngine";

function isEmergency(customer: Lead): boolean {
  const service =
    customer.service?.toLowerCase() ?? "";

  return (
    service.includes("emergency") ||
    service.includes("no cooling") ||
    service.includes("no heat")
  );
}

export function buildPriority(
  customers: Lead[],
  memory?: AtlasMemory | null
): AtlasPriority {
  if (customers.length === 0) {
    throw new Error(
      "Atlas requires at least one customer."
    );
  }

  const atlasMemory =
    normalizeAtlasMemory(memory);

  const rankedCustomers = customers
    .map((customer) => {
      const intelligence =
        scoreCustomer(customer);

      const memoryBoost =
        atlasMemory.emergencyFirst &&
        isEmergency(customer)
          ? 10
          : 0;

      return {
        customer,
        intelligence,
        adjustedScore: Math.min(
          100,
          intelligence.score + memoryBoost
        ),
      };
    })
    .sort(
      (first, second) =>
        second.adjustedScore -
        first.adjustedScore
    );

  const topPriority = rankedCustomers[0];

  const confidence = Math.min(
    99,
    Math.max(
      50,
      topPriority.adjustedScore + 12
    )
  );

  return {
    customer: topPriority.customer,
    score: topPriority.adjustedScore,
    confidence,
    riskLevel: getCustomerRiskLevel(
      topPriority.customer
    ),
    estimatedValue: parseLeadValue(
      topPriority.customer.value
    ),
    reason:
      topPriority.intelligence.reason.join(". "),
    recommendedAction: getRecommendedAction(
      topPriority.customer
    ),
  };
}