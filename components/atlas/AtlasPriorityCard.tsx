import type { Lead } from "@/types";
import type {
  AtlasRiskLevel,
} from "@/lib/intelligence/types";

type AtlasPriorityCardProps = {
  customer: Lead;
  score: number;
  confidence: number;
  riskLevel: AtlasRiskLevel;
  estimatedValue: number;
  reason: string;
  recommendedAction: string;
  onOpenCustomer(customer: Lead): void;
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatRiskLevel(
  riskLevel: AtlasRiskLevel
): string {
  return riskLevel
    .replace("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

export default function AtlasPriorityCard({
  customer,
  score,
  confidence,
  riskLevel,
  estimatedValue,
  reason,
  recommendedAction,
  onOpenCustomer,
}: AtlasPriorityCardProps) {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white shadow-2xl">
      <div className="p-7 md:p-9">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-300">
              Today&apos;s Priority
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight">
              {customer.name}
            </h2>

            <p className="mt-2 text-lg text-slate-300">
              {customer.service}
            </p>
          </div>

          <div className="flex gap-3">
            <Metric
              label="Priority"
              value={`${score}`}
            />

            <Metric
              label="Confidence"
              value={`${confidence}%`}
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Detail
            label="Risk"
            value={formatRiskLevel(riskLevel)}
          />

          <Detail
            label="Opportunity"
            value={formatCurrency(estimatedValue)}
          />

          <Detail
            label="Status"
            value={customer.status}
          />
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 p-5">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
            Atlas Recommendation
          </p>

          <p className="mt-3 text-xl font-bold">
            {recommendedAction}
          </p>

          <p className="mt-3 leading-relaxed text-slate-300">
            {reason}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onOpenCustomer(customer)}
          className="mt-7 rounded-xl bg-white px-6 py-4 font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100"
        >
          Open Customer →
        </button>
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-28 rounded-2xl border border-white/10 bg-white/10 p-4 text-center">
      <p className="text-xs uppercase tracking-wider text-slate-300">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>

      <p className="mt-2 font-bold text-white">
        {value}
      </p>
    </div>
  );
}