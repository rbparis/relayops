import type {
  AtlasRecommendation,
  AtlasRiskLevel,
} from "@/lib/intelligence/types";

type AtlasRecommendationsProps = {
  recommendations: AtlasRecommendation[];
};

function getRiskLabel(
  riskLevel: AtlasRiskLevel
): string {
  return riskLevel
    .replace("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function AtlasRecommendations({
  recommendations,
}: AtlasRecommendationsProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">
        Atlas Actions
      </p>

      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
        What to do next
      </h2>

      <div className="mt-7 space-y-4">
        {recommendations.map(
          (recommendation, index) => (
            <article
              key={recommendation.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                  {index + 1}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-bold text-slate-950">
                        {recommendation.title}
                      </h3>

                      <p className="mt-2 leading-relaxed text-slate-600">
                        {recommendation.description}
                      </p>
                    </div>

                    <div className="shrink-0 text-sm font-semibold text-slate-500">
                      {formatCurrency(
                        recommendation.estimatedValue
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-700">
                      {recommendation.actionType.replace(
                        "_",
                        " "
                      )}
                    </span>

                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange-800">
                      {getRiskLabel(
                        recommendation.riskLevel
                      )}{" "}
                      risk
                    </span>
                  </div>
                </div>
              </div>
            </article>
          )
        )}
      </div>
    </section>
  );
}