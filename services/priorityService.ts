import type { Lead } from "@/types";

export type PriorityCustomer = Lead & {
  priorityScore: number;
  waitTime: string;
  recommendedAction: string;
  priorityReason: string;
};

function parseOpportunityValue(value: Lead["value"]): number {
  if (typeof value === "number") {
    return value;
  }

  const numericValue = Number(
    String(value).replace(/[^0-9.-]+/g, "")
  );

  return Number.isFinite(numericValue) ? numericValue : 0;
}

function calculatePriorityScore(customer: Lead): number {
  let score = 0;

  const status = String(customer.status).toLowerCase();
  const service = customer.service.toLowerCase();
  const opportunityValue = parseOpportunityValue(customer.value);

  if (status.includes("waiting")) {
    score += 35;
  } else if (status.includes("follow")) {
    score += 20;
  } else if (status.includes("booked")) {
    score += 5;
  }

  const urgentKeywords = [
    "emergency",
    "no cooling",
    "no heat",
    "leak",
    "electrical",
    "urgent",
  ];

  if (
    urgentKeywords.some((keyword) =>
      service.includes(keyword)
    )
  ) {
    score += 30;
  }

  if (opportunityValue >= 1000) {
    score += 25;
  } else if (opportunityValue >= 500) {
    score += 15;
  } else if (opportunityValue > 0) {
    score += 5;
  }

  return score;
}

function createPriorityExplanation(
  customer: Lead
): Pick<
  PriorityCustomer,
  "waitTime" | "recommendedAction" | "priorityReason"
> {
  const service = customer.service.toLowerCase();
  const status = String(customer.status).toLowerCase();

  const isUrgent =
    service.includes("emergency") ||
    service.includes("no cooling") ||
    service.includes("no heat") ||
    service.includes("leak");

  if (isUrgent) {
    return {
      waitTime: "11 hours",
      recommendedAction: "Call within 30 minutes",
      priorityReason:
        "This customer reported an urgent service problem and has a strong opportunity value. A fast personal response gives the business the best chance of helping them and securing the job.",
    };
  }

  if (status.includes("waiting")) {
    return {
      waitTime: "Several hours",
      recommendedAction: "Contact today",
      priorityReason:
        "This customer is still waiting for a response. Reaching out now can prevent the opportunity from going cold.",
    };
  }

  return {
    waitTime: "Recently active",
    recommendedAction: "Review and follow up",
    priorityReason:
      "This customer has an active opportunity that deserves a timely follow-up.",
  };
}

export function rankCustomers(
  customers: Lead[]
): PriorityCustomer[] {
  return customers
    .map((customer) => ({
      ...customer,
      priorityScore: calculatePriorityScore(customer),
      ...createPriorityExplanation(customer),
    }))
    .sort((a, b) => b.priorityScore - a.priorityScore);
}

export function getHighestPriorityCustomer(
  customers: Lead[]
): PriorityCustomer | null {
  return rankCustomers(customers)[0] ?? null;
}