export type TimeReturnInputs = {
  employees: number;
  averageJobValue: number;
  missedCallsPerWeek: number;
  ownerHoursPerWeek: number;
};

export type TimeReturnResults = {
  annualMissedCallOpportunity: number;
  annualRevenuePotential: number;
  annualAppointmentsPotential: number;
  monthlyHoursReturned: number;
  annualHoursReturned: number;
  workWeeksReturned: number;
};

const WEEKS_PER_YEAR = 52;
const WORK_WEEK_HOURS = 40;

/**
 * Prototype assumptions used for the EMBUR assessment.
 *
 * These values are estimates and must not be represented as guaranteed results.
 * They can later be replaced with industry-specific benchmarks and real
 * customer performance data.
 */
const assumptions = {
  missedCallConversionOpportunity: 0.3,
  recoverableOpportunityRate: 0.55,
  minutesReturnedPerRecoveredCall: 18,
  administrativeHoursReturnedPerEmployeePerMonth: 1.5,
  ownerWorkloadReturnRate: 0.08,
};

function safeNumber(value: number, fallback = 0) {
  return Number.isFinite(value) ? Math.max(value, 0) : fallback;
}

export function calculateTimeReturn(
  inputs: TimeReturnInputs
): TimeReturnResults {
  const employees = safeNumber(inputs.employees);
  const averageJobValue = safeNumber(inputs.averageJobValue);
  const missedCallsPerWeek = safeNumber(inputs.missedCallsPerWeek);
  const ownerHoursPerWeek = safeNumber(inputs.ownerHoursPerWeek);

  const annualMissedCalls = missedCallsPerWeek * WEEKS_PER_YEAR;

  const annualMissedCallOpportunity =
    annualMissedCalls *
    assumptions.missedCallConversionOpportunity *
    averageJobValue;

  const annualAppointmentsPotential =
    annualMissedCalls *
    assumptions.missedCallConversionOpportunity *
    assumptions.recoverableOpportunityRate;

  const annualRevenuePotential =
    annualAppointmentsPotential * averageJobValue;

  const recoveredCallHoursPerMonth =
    ((missedCallsPerWeek *
      assumptions.recoverableOpportunityRate *
      assumptions.minutesReturnedPerRecoveredCall) /
      60) *
    (WEEKS_PER_YEAR / 12);

  const employeeAdminHoursPerMonth =
    employees *
    assumptions.administrativeHoursReturnedPerEmployeePerMonth;

  const ownerHoursReturnedPerMonth =
    ownerHoursPerWeek *
    assumptions.ownerWorkloadReturnRate *
    (WEEKS_PER_YEAR / 12);

  const monthlyHoursReturned =
    recoveredCallHoursPerMonth +
    employeeAdminHoursPerMonth +
    ownerHoursReturnedPerMonth;

  const annualHoursReturned = monthlyHoursReturned * 12;
  const workWeeksReturned = annualHoursReturned / WORK_WEEK_HOURS;

  return {
    annualMissedCallOpportunity: Math.round(
      annualMissedCallOpportunity
    ),
    annualRevenuePotential: Math.round(annualRevenuePotential),
    annualAppointmentsPotential: Math.round(
      annualAppointmentsPotential
    ),
    monthlyHoursReturned: Math.round(monthlyHoursReturned),
    annualHoursReturned: Math.round(annualHoursReturned),
    workWeeksReturned:
      Math.round(workWeeksReturned * 10) / 10,
  };
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);
}