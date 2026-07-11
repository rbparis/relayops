import {
  formatCurrency,
  formatNumber,
  type TimeReturnResults,
} from "@/services/timeReturnService";

type TimeSummaryCardProps = {
  results: TimeReturnResults;
};

export default function TimeSummaryCard({
  results,
}: TimeSummaryCardProps) {
  const summaries = [
    {
      label: "Revenue opportunity",
      value: formatCurrency(results.annualRevenuePotential),
      description: "Estimated recovered job value each year.",
    },
    {
      label: "Appointments",
      value: formatNumber(results.annualAppointmentsPotential),
      description: "Potential appointments recovered annually.",
    },
    {
      label: "Monthly time",
      value: `${formatNumber(results.monthlyHoursReturned)} hrs`,
      description: "Estimated hours returned each month.",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {summaries.map((summary, index) => (
        <article
          key={summary.label}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm animate-[emburReveal_500ms_ease-out_both]"
          style={{
            animationDelay: `${index * 140 + 300}ms`,
          }}
        >
          <p className="text-sm font-semibold text-slate-500">
            {summary.label}
          </p>

          <p className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
            {summary.value}
          </p>

          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            {summary.description}
          </p>
        </article>
      ))}
    </div>
  );
}