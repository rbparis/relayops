import {
  formatCurrency,
  formatNumber,
  type TimeReturnResults as Results,
} from "@/services/timeReturnService";

type TimeReturnResultsProps = {
  results: Results;
};

export default function TimeReturnResults({
  results,
}: TimeReturnResultsProps) {
  const metrics = [
    {
      label: "Potential Revenue Recovered",
      value: formatCurrency(results.annualRevenuePotential),
      detail: "Estimated annual recovered job value.",
    },
    {
      label: "Potential Appointments",
      value: formatNumber(results.annualAppointmentsPotential),
      detail: "Estimated appointments that could be recovered each year.",
    },
    {
      label: "Time Returned Monthly",
      value: `${formatNumber(results.monthlyHoursReturned)} hours`,
      detail: "Estimated time returned through repetitive work handled.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-br from-orange-500 via-orange-500 to-amber-300 p-7 text-slate-950 shadow-xl md:p-8">
        <p className="text-sm font-bold uppercase tracking-wider">
          Your potential time returned
        </p>

        <p className="mt-6 text-6xl font-bold tracking-tight">
          {formatNumber(results.annualHoursReturned)}
        </p>

        <p className="mt-2 text-2xl font-bold">
          hours every year
        </p>

        <div className="mt-7 border-t border-slate-950/15 pt-6">
          <p className="text-xl font-bold">
            That is approximately{" "}
            {results.workWeeksReturned.toFixed(1)} full work weeks.
          </p>

          <p className="mt-3 leading-relaxed text-slate-900/75">
            Time that could belong to your family, health, team,
            growth, or life outside the business again.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-semibold text-slate-500">
              {metric.label}
            </p>

            <p className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
              {metric.value}
            </p>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              {metric.detail}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
        <p className="font-bold text-blue-950">
          Missed-call opportunity identified
        </p>

        <p className="mt-2 text-2xl font-bold text-blue-900">
          {formatCurrency(results.annualMissedCallOpportunity)}
        </p>

        <p className="mt-2 text-sm leading-relaxed text-blue-800">
          Estimated annual opportunity associated with missed calls
          before applying EMBUR&apos;s recoverable-rate estimate.
        </p>
      </div>

      <p className="text-xs leading-relaxed text-slate-400">
        These figures are directional estimates based on the
        information provided and prototype assumptions. Actual results
        vary by business, market, operating model, customer demand, and
        implementation.
      </p>
    </div>
  );
}