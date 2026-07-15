type AtlasForecastGridProps = {
  pipeline: number;
  expectedRevenue: number;
  expectedAppointments: number;
  revenueAtRisk: number;
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function AtlasForecastGrid({
  pipeline,
  expectedRevenue,
  expectedAppointments,
  revenueAtRisk,
}: AtlasForecastGridProps) {
  return (
    <section>
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
        Business Forecast
      </p>

      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
        Today&apos;s opportunity
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ForecastCard
          label="Pipeline"
          value={formatCurrency(pipeline)}
          detail="Total active opportunity"
        />

        <ForecastCard
          label="Expected Revenue"
          value={formatCurrency(expectedRevenue)}
          detail="Weighted by Atlas priority"
        />

        <ForecastCard
          label="Revenue at Risk"
          value={formatCurrency(revenueAtRisk)}
          detail="Waiting or follow-up required"
        />

        <ForecastCard
          label="Appointments"
          value={`${expectedAppointments}`}
          detail="Expected from current activity"
        />
      </div>
    </section>
  );
}

function ForecastCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>

      <p className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
        {value}
      </p>

      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        {detail}
      </p>
    </article>
  );
}