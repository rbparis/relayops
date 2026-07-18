import type { AtlasSnapshot } from "@/lib/intelligence/types";
import { parseLeadValue } from "@/lib/intelligence/scoreCustomer";
import type { Lead } from "@/types";

export type PulseDirection = "up" | "steady" | "down";

export interface AtlasPulseMetric {
  id: string;
  label: string;
  value: string;
  detail: string;
  score: number;
  direction: PulseDirection;
}

export interface AtlasBusinessPulse {
  score: number;
  status: "strong" | "stable" | "attention" | "critical";
  summary: string;
  metrics: AtlasPulseMetric[];
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function statusFromScore(
  score: number
): AtlasBusinessPulse["status"] {
  if (score >= 85) {
    return "strong";
  }

  if (score >= 70) {
    return "stable";
  }

  if (score >= 50) {
    return "attention";
  }

  return "critical";
}

function directionFromScore(score: number): PulseDirection {
  if (score >= 80) {
    return "up";
  }

  if (score >= 60) {
    return "steady";
  }

  return "down";
}

function createWaitingDetail(waiting: number): string {
  if (waiting === 0) {
    return "No customers are waiting.";
  }

  if (waiting === 1) {
    return "1 customer is waiting.";
  }

  return `${waiting} customers are waiting.`;
}

function createFollowUpDetail(followUp: number): string {
  if (followUp === 0) {
    return "No follow-ups are overdue.";
  }

  if (followUp === 1) {
    return "1 follow-up needs attention.";
  }

  return `${followUp} follow-ups need attention.`;
}

function createBookingDetail(booked: number): string {
  if (booked === 1) {
    return "1 active customer is booked.";
  }

  return `${booked} active customers are booked.`;
}

function createRevenueDetail(revenueAtRisk: number): string {
  if (revenueAtRisk === 0) {
    return "No active revenue is marked at risk.";
  }

  return `${formatCurrency(revenueAtRisk)} needs attention.`;
}

function createSummary(
  status: AtlasBusinessPulse["status"]
): string {
  switch (status) {
    case "strong":
      return "Customer response, bookings, and revenue protection are in strong shape.";

    case "stable":
      return "The business is stable, with a small number of actions to complete.";

    case "attention":
      return "Several customer opportunities need focused attention today.";

    case "critical":
      return "Immediate action is needed to protect customer opportunities and revenue.";

    default:
      return "Atlas is evaluating the current state of the business.";
  }
}

export function createAtlasBusinessPulse(
  customers: Lead[],
  snapshot: AtlasSnapshot
): AtlasBusinessPulse {
  const customerCount = customers.length;
  const safeCustomerCount = Math.max(1, customerCount);

  const waiting = snapshot.metrics.waitingCustomers;
  const followUp = snapshot.metrics.followUpCustomers;
  const booked = snapshot.metrics.bookedCustomers;

  const responseScore = clampScore(
    100 - (waiting / safeCustomerCount) * 100
  );

  const followUpScore = clampScore(
    100 - (followUp / safeCustomerCount) * 80
  );

  const bookingScore = clampScore(
    (booked / safeCustomerCount) * 100
  );

  const revenueCoverageScore =
    snapshot.forecast.pipeline > 0
      ? clampScore(
          100 -
            (snapshot.revenueAtRisk /
              snapshot.forecast.pipeline) *
              100
        )
      : 100;

  const activeValue = customers.reduce(
    (totalValue, customer) =>
      totalValue + parseLeadValue(customer.value),
    0
  );

  const protectedRevenue = Math.max(
    0,
    activeValue - snapshot.revenueAtRisk
  );

  const metrics: AtlasPulseMetric[] = [
    {
      id: "response",
      label: "Response control",
      value: `${responseScore}%`,
      detail: createWaitingDetail(waiting),
      score: responseScore,
      direction: directionFromScore(responseScore),
    },
    {
      id: "follow-up",
      label: "Follow-up control",
      value: `${followUpScore}%`,
      detail: createFollowUpDetail(followUp),
      score: followUpScore,
      direction: directionFromScore(followUpScore),
    },
    {
      id: "booking",
      label: "Booking momentum",
      value: `${booked}/${customerCount}`,
      detail: createBookingDetail(booked),
      score: bookingScore,
      direction: directionFromScore(bookingScore),
    },
    {
      id: "revenue",
      label: "Revenue protected",
      value: formatCurrency(protectedRevenue),
      detail: createRevenueDetail(snapshot.revenueAtRisk),
      score: revenueCoverageScore,
      direction: directionFromScore(revenueCoverageScore),
    },
  ];

  const totalMetricScore = metrics.reduce(
    (sum, metric) => sum + metric.score,
    0
  );

  const score = clampScore(
    totalMetricScore / metrics.length
  );

  const status = statusFromScore(score);
  const summary = createSummary(status);

  return {
    score,
    status,
    summary,
    metrics,
  };
}