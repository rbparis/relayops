import type { Lead } from "@/types";
import { createAtlasBrief } from "@/lib/intelligence/atlasBrief";

interface Props {
  customers: Lead[];
}

export default function AtlasMorningBrief({
  customers,
}: Props) {
  const brief = createAtlasBrief(customers);

  return (
    <section className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-8 text-white shadow-2xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-300">
            Atlas Intelligence
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Good morning.
          </h2>

          <p className="mt-4 max-w-2xl text-slate-300">
            {brief.summary}
          </p>
        </div>

        <div className="hidden rounded-2xl bg-white/10 px-6 py-5 text-center lg:block">
          <p className="text-xs uppercase tracking-widest text-slate-300">
            Business Health
          </p>

          <p className="mt-2 text-5xl font-bold">
            {brief.businessHealth}
          </p>

          <p className="text-sm text-slate-300">
            /100
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <Card
          title="Today's Priority"
          value={brief.priority.name}
          subtitle={brief.priority.service ?? ""}
        />

        <Card
          title="Revenue At Risk"
          value={`$${brief.revenueAtRisk.toLocaleString()}`}
          subtitle={`${brief.customersWaiting} waiting`}
        />

        <Card
          title="Atlas Recommendation"
          value={brief.recommendation}
          subtitle={`Priority Score ${brief.priorityScore}`}
        />
      </div>
    </section>
  );
}

function Card({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
      <p className="text-xs uppercase tracking-widest text-slate-300">
        {title}
      </p>

      <h3 className="mt-3 text-xl font-bold leading-snug">
        {value}
      </h3>

      <p className="mt-2 text-sm text-slate-300">
        {subtitle}
      </p>
    </div>
  );
}