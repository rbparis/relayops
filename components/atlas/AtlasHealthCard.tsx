type AtlasHealthCardProps = {
  score: number;
  summary: string;
};

function getHealthLabel(score: number): string {
  if (score >= 90) return "Strong";
  if (score >= 75) return "Stable";
  if (score >= 60) return "Needs attention";
  return "At risk";
}

export default function AtlasHealthCard({
  score,
  summary,
}: AtlasHealthCardProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
        Business Health
      </p>

      <div className="mt-5 flex items-end gap-3">
        <p className="text-6xl font-bold tracking-tight text-slate-950">
          {score}
        </p>

        <p className="pb-2 text-lg font-semibold text-slate-500">
          / 100
        </p>
      </div>

      <p className="mt-4 text-lg font-bold text-slate-950">
        {getHealthLabel(score)}
      </p>

      <p className="mt-2 leading-relaxed text-slate-600">
        {summary}
      </p>
    </section>
  );
}