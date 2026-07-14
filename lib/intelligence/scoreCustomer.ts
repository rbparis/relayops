import type { Lead } from "@/types";

export interface CustomerScore {
  score: number;
  revenue: number;
  urgency: number;
  responseDelay: number;
  history: number;
  appointment: number;
  reason: string[];
}

export function parseLeadValue(
  value: Lead["value"]
): number {
  if (typeof value === "number") {
    return Math.max(value, 0);
  }

  const parsedValue = Number(
    String(value ?? "").replace(/[^0-9.-]+/g, "")
  );

  return Number.isFinite(parsedValue)
    ? Math.max(parsedValue, 0)
    : 0;
}

function revenueScore(value: number) {
  if (value >= 8000) return 30;
  if (value >= 3000) return 24;
  if (value >= 1000) return 18;
  if (value > 0) return 10;

  return 5;
}

function urgencyScore(service?: string) {
  const text = service?.toLowerCase() ?? "";

  if (
    text.includes("emergency") ||
    text.includes("no cooling") ||
    text.includes("no heat")
  ) {
    return 25;
  }

  if (text.includes("repair")) {
    return 20;
  }

  if (text.includes("estimate")) {
    return 15;
  }

  return 10;
}

function responseScore(status?: string) {
  const text = status?.toLowerCase() ?? "";

  if (text.includes("waiting")) {
    return 20;
  }

  if (text.includes("follow")) {
    return 15;
  }

  if (text.includes("booked")) {
    return 5;
  }

  return 10;
}

function historyScore() {
  return 10;
}

function appointmentScore(status?: string) {
  const text = status?.toLowerCase() ?? "";

  if (text.includes("booked")) {
    return 10;
  }

  return 5;
}

export function scoreCustomer(
  customer: Lead
): CustomerScore {
  const opportunityValue = parseLeadValue(
    customer.value
  );

  const revenue = revenueScore(
    opportunityValue
  );

  const urgency = urgencyScore(
    customer.service
  );

  const responseDelay = responseScore(
    customer.status
  );

  const history = historyScore();

  const appointment = appointmentScore(
    customer.status
  );

  const score = Math.min(
    100,
    revenue +
      urgency +
      responseDelay +
      history +
      appointment
  );

  const reason: string[] = [];

  if (urgency >= 20) {
    reason.push("Urgent service request");
  }

  if (revenue >= 24) {
    reason.push("High revenue opportunity");
  }

  if (responseDelay >= 15) {
    reason.push("Customer awaiting response");
  }

  if (appointment === 10) {
    reason.push("Booked appointment");
  }

  if (reason.length === 0) {
    reason.push("Active customer opportunity");
  }

  return {
    score,
    revenue,
    urgency,
    responseDelay,
    history,
    appointment,
    reason,
  };
}