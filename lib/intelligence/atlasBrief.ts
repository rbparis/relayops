import type { Lead } from "@/types";
import {
  parseLeadValue,
  scoreCustomer,
} from "./scoreCustomer";

export interface AtlasBrief {
  priority: Lead;
  priorityScore: number;
  businessHealth: number;
  revenueAtRisk: number;
  customersWaiting: number;
  recommendation: string;
  summary: string;
}

export function createAtlasBrief(
  customers: Lead[]
): AtlasBrief {
  if (customers.length === 0) {
    throw new Error(
      "Atlas requires at least one customer."
    );
  }

  const ranked = customers
    .map((customer) => ({
      customer,
      intelligence: scoreCustomer(customer),
    }))
    .sort(
      (a, b) =>
        b.intelligence.score -
        a.intelligence.score
    );

  const priority = ranked[0];

  const waitingCustomers = customers.filter(
    (customer) =>
      customer.status
        ?.toLowerCase()
        .includes("waiting")
  );

  const revenueAtRisk =
    waitingCustomers.reduce(
      (total, customer) =>
        total + parseLeadValue(customer.value),
      0
    );

  const averageScore =
    ranked.reduce(
      (total, item) =>
        total + item.intelligence.score,
      0
    ) / ranked.length;

  const businessHealth = Math.max(
    0,
    Math.min(
      100,
      Math.round(100 - (100 - averageScore) / 2)
    )
  );

  const customersWaiting =
    waitingCustomers.length;

  const recommendation =
    `Call ${priority.customer.name} first.`;

  const summary =
    `${customersWaiting} customer${
      customersWaiting === 1 ? "" : "s"
    } waiting. Revenue currently at risk: $${revenueAtRisk.toLocaleString(
      "en-US"
    )}.`;

  return {
    priority: priority.customer,
    priorityScore:
      priority.intelligence.score,
    businessHealth,
    revenueAtRisk,
    customersWaiting,
    recommendation,
    summary,
  };
}