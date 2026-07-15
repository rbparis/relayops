import type { Lead } from "@/types";
import { parseLeadValue } from "../scoreCustomer";

export type AtlasRevenueResult = {
  pipeline: number;
  revenueAtRisk: number;
};

function requiresAttention(customer: Lead): boolean {
  const status =
    customer.status?.toLowerCase() ?? "";

  return (
    status.includes("waiting") ||
    status.includes("follow")
  );
}

export function buildRevenue(
  customers: Lead[]
): AtlasRevenueResult {
  const pipeline = customers.reduce(
    (total, customer) =>
      total + parseLeadValue(customer.value),
    0
  );

  const revenueAtRisk = customers
    .filter(requiresAttention)
    .reduce(
      (total, customer) =>
        total + parseLeadValue(customer.value),
      0
    );

  return {
    pipeline,
    revenueAtRisk,
  };
}