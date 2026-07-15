import type { Lead } from "@/types";
import { calculateBusinessHealth } from "../businessHealth";

export type AtlasHealthResult = {
  score: number;
  summary: string;
};

export function buildHealth(
  customers: Lead[]
): AtlasHealthResult {
  const score = calculateBusinessHealth(customers);

  const waitingCount = customers.filter((customer) =>
    customer.status?.toLowerCase().includes("waiting")
  ).length;

  const followUpCount = customers.filter((customer) =>
    customer.status?.toLowerCase().includes("follow")
  ).length;

  const actionsNeeded = waitingCount + followUpCount;

  if (score >= 90) {
    return {
      score,
      summary:
        "The business is in strong shape today.",
    };
  }

  if (score >= 75) {
    return {
      score,
      summary: `${actionsNeeded} customer action${
        actionsNeeded === 1 ? "" : "s"
      } need attention.`,
    };
  }

  if (score >= 60) {
    return {
      score,
      summary:
        "Several customer opportunities require attention today.",
    };
  }

  return {
    score,
    summary:
      "Immediate owner attention is recommended.",
  };
}