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

export function buildPriority(
  customers: Lead[]
): AtlasPriority {
  if (customers.length === 0) {
    throw new Error(
      "Atlas requires at least one customer."
    );
  }

  const rankedCustomers = customers
    .map((customer) => ({
      customer,
      intelligence: scoreCustomer(customer),
    }))
    .sort(
      (first, second) =>
        second.intelligence.score -
        first.intelligence.score
    );

  const topPriority = rankedCustomers[0];

  const confidence = Math.min(
    99,
    Math.max(
      50,
      topPriority.intelligence.score + 12
    )
  );

  return {
    customer: topPriority.customer,
    score: topPriority.intelligence.score,
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