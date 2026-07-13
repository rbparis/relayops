import type { Lead } from "@/types";

export type OpportunityLevel =
  | "critical"
  | "high"
  | "active"
  | "secured";

export type OpportunityCustomer = Lead & {
  opportunityScore: number;
  estimatedValue: number;
  level: OpportunityLevel;
  levelLabel: string;
  recommendedAction: string;
  reasons: string[];
};

function parseOpportunityValue(value: Lead["value"]): number {
  if (typeof value === "number") {
    return Math.max(value, 0);
  }

  const parsedValue = Number(
    String(value).replace(/[^0-9.-]+/g, "")
  );

  return Number.isFinite(parsedValue)
    ? Math.max(parsedValue, 0)
    : 0;
}

function hasUrgentService(service: string): boolean {
  const normalizedService = service.toLowerCase();

  const urgentTerms = [
    "emergency",
    "no cooling",
    "no heat",
    "leak",
    "electrical",
    "urgent",
  ];

  return urgentTerms.some((term) =>
    normalizedService.includes(term)
  );
}

function calculateOpportunityScore(customer: Lead): number {
  const status = String(customer.status).toLowerCase();
  const estimatedValue = parseOpportunityValue(customer.value);

  let score = 35;

  if (status.includes("waiting")) {
    score += 28;
  }

  if (status.includes("follow")) {
    score += 18;
  }

  if (status.includes("booked")) {
    score += 8;
  }

  if (hasUrgentService(customer.service)) {
    score += 24;
  }

  if (estimatedValue >= 5000) {
    score += 20;
  } else if (estimatedValue >= 1000) {
    score += 14;
  } else if (estimatedValue >= 500) {
    score += 8;
  }

  return Math.min(100, Math.round(score));
}

function getOpportunityLevel(
  customer: Lead,
  score: number
): Pick<
  OpportunityCustomer,
  "level" | "levelLabel" | "recommendedAction"
> {
  const status = String(customer.status).toLowerCase();

  if (status.includes("booked")) {
    return {
      level: "secured",
      levelLabel: "Secured",
      recommendedAction: "Protect the appointment",
    };
  }

  if (score >= 85) {
    return {
      level: "critical",
      levelLabel: "Critical Opportunity",
      recommendedAction: `Contact ${customer.name} now`,
    };
  }

  if (score >= 70) {
    return {
      level: "high",
      levelLabel: "High Opportunity",
      recommendedAction: `Follow up with ${customer.name} today`,
    };
  }

  return {
    level: "active",
    levelLabel: "Active Opportunity",
    recommendedAction: "Continue monitoring",
  };
}

function getOpportunityReasons(customer: Lead): string[] {
  const status = String(customer.status).toLowerCase();
  const estimatedValue = parseOpportunityValue(customer.value);
  const reasons: string[] = [];

  if (hasUrgentService(customer.service)) {
    reasons.push("Urgent service need");
  }

  if (status.includes("waiting")) {
    reasons.push("Customer is waiting");
  }

  if (status.includes("follow")) {
    reasons.push("Follow-up remains active");
  }

  if (status.includes("booked")) {
    reasons.push("Appointment already secured");
  }

  if (estimatedValue >= 5000) {
    reasons.push("Major revenue opportunity");
  } else if (estimatedValue >= 1000) {
    reasons.push("Strong revenue opportunity");
  } else if (estimatedValue > 0) {
    reasons.push("Active revenue opportunity");
  }

  if (reasons.length === 0) {
    reasons.push("Recent customer activity");
  }

  return reasons;
}

export function rankOpportunities(
  customers: Lead[]
): OpportunityCustomer[] {
  return customers
    .map((customer) => {
      const opportunityScore =
        calculateOpportunityScore(customer);

      return {
        ...customer,
        opportunityScore,
        estimatedValue: parseOpportunityValue(customer.value),
        reasons: getOpportunityReasons(customer),
        ...getOpportunityLevel(customer, opportunityScore),
      };
    })
    .sort((a, b) => {
      if (b.opportunityScore !== a.opportunityScore) {
        return b.opportunityScore - a.opportunityScore;
      }

      return b.estimatedValue - a.estimatedValue;
    });
}

export function getTopOpportunity(
  customers: Lead[]
): OpportunityCustomer | null {
  return rankOpportunities(customers)[0] ?? null;
}