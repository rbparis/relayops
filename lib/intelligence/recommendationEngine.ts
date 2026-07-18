import type { Lead } from "@/types";
import {
  parseLeadValue,
  scoreCustomer,
} from "./scoreCustomer";
import type {
  AtlasRecommendation,
  AtlasRiskLevel,
} from "./types";

function normalize(value?: string): string {
  return value?.trim().toLowerCase() ?? "";
}

export function getCustomerRiskLevel(
  customer: Lead
): AtlasRiskLevel {
  const intelligence = scoreCustomer(customer);

  if (intelligence.score >= 75) {
    return "critical";
  }

  if (intelligence.score >= 60) {
    return "high";
  }

  if (intelligence.score >= 40) {
    return "medium";
  }

  return "low";
}

export function getRecommendedAction(
  customer: Lead
): string {
  const status = normalize(customer.status);
  const service = normalize(customer.service);

  if (
    status.includes("waiting") &&
    (service.includes("emergency") ||
      service.includes("no cooling") ||
      service.includes("no heat"))
  ) {
    return `Call ${customer.name} immediately.`;
  }

  if (status.includes("waiting")) {
    return `Call ${customer.name} next.`;
  }

  if (status.includes("follow")) {
    return `Send ${customer.name} a follow-up message.`;
  }

  if (status.includes("booked")) {
    return `Confirm ${customer.name}'s appointment.`;
  }

  return `Review ${customer.name}'s request.`;
}

export function createRecommendations(
  customers: Lead[]
): AtlasRecommendation[] {
  const rankedRecommendations = customers.map((customer) => {
    const intelligence = scoreCustomer(customer);
    const status = normalize(customer.status);
    const riskLevel = getCustomerRiskLevel(customer);

    let actionType: AtlasRecommendation["actionType"] =
      "review";

    if (status.includes("waiting")) {
      actionType = "call";
    } else if (status.includes("follow")) {
      actionType = "follow_up";
    } else if (status.includes("booked")) {
      actionType = "confirm";
    }

    const recommendation: AtlasRecommendation = {
      id: `atlas-action-${customer.id}`,
      customerId: customer.id,
      title: getRecommendedAction(customer),
      description: intelligence.reason.join(". "),
      actionType,
      riskLevel,
      estimatedValue: parseLeadValue(customer.value),
    };

    return {
      recommendation,
      score: intelligence.score,
    };
  });

  return rankedRecommendations
    .sort((first, second) => second.score - first.score)
    .slice(0, 3)
    .map(({ recommendation }) => recommendation);
}