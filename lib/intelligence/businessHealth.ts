import type { Lead } from "@/types";

export function calculateBusinessHealth(
  customers: Lead[]
): number {
  let score = 100;

  const waiting = customers.filter((c) =>
    c.status?.toLowerCase().includes("waiting")
  ).length;

  const followUps = customers.filter((c) =>
    c.status?.toLowerCase().includes("follow")
  ).length;

  const booked = customers.filter((c) =>
    c.status?.toLowerCase().includes("booked")
  ).length;

  score -= waiting * 10;

  score -= followUps * 5;

  score += booked * 3;

  return Math.max(0, Math.min(100, score));
}