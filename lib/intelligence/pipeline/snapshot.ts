import type { Lead } from "@/types";
import { buildForecast } from "./forecast";
import { buildHealth } from "./health";
import { buildPriority } from "./priority";
import { buildRecommendations } from "./recommendations";
import { buildRevenue } from "./revenue";
import type {
  AtlasMetrics,
  AtlasSnapshot,
} from "../types";
import type { AtlasMemory } from "../memory/types";

function buildMetrics(
  customers: Lead[]
): AtlasMetrics {
  return {
    totalCustomers: customers.length,

    waitingCustomers: customers.filter(
      (customer) =>
        customer.status
          ?.toLowerCase()
          .includes("waiting")
    ).length,

    bookedCustomers: customers.filter(
      (customer) =>
        customer.status
          ?.toLowerCase()
          .includes("booked")
    ).length,

    followUpCustomers: customers.filter(
      (customer) =>
        customer.status
          ?.toLowerCase()
          .includes("follow")
    ).length,
  };
}

export function buildAtlasSnapshot(
  customers: Lead[],
  memory?: AtlasMemory | null
): AtlasSnapshot {
  if (customers.length === 0) {
    throw new Error(
      "Atlas requires at least one customer."
    );
  }

  const health = buildHealth(customers);
  const revenue = buildRevenue(customers);

  return {
    businessHealth: health.score,
    businessHealthSummary: health.summary,
    revenueAtRisk: revenue.revenueAtRisk,
    topPriority: buildPriority(
      customers,
      memory
    ),
    recommendations: buildRecommendations(
      customers,
      memory
    ),
    forecast: buildForecast(customers),
    metrics: buildMetrics(customers),
  };
}