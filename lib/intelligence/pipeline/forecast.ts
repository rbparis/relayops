import type { Lead } from "@/types";
import {
  parseLeadValue,
  scoreCustomer,
} from "../scoreCustomer";
import type { AtlasForecast } from "../types";

export function buildForecast(
  customers: Lead[]
): AtlasForecast {
  const expectedRevenue = Math.round(
    customers.reduce((total, customer) => {
      const opportunityValue = parseLeadValue(
        customer.value
      );

      const probability =
        scoreCustomer(customer).score / 100;

      return (
        total + opportunityValue * probability
      );
    }, 0)
  );

  const bookedCustomers = customers.filter(
    (customer) =>
      customer.status
        ?.toLowerCase()
        .includes("booked")
  ).length;

  const waitingCustomers = customers.filter(
    (customer) =>
      customer.status
        ?.toLowerCase()
        .includes("waiting")
  ).length;

  const pipeline = customers.reduce(
    (total, customer) =>
      total + parseLeadValue(customer.value),
    0
  );

  return {
    pipeline,
    expectedRevenue,
    expectedAppointments:
      bookedCustomers + waitingCustomers,
  };
}