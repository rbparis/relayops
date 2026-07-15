import type { Lead } from "@/types";
import AtlasForecastGrid from "@/components/atlas/AtlasForecastGrid";
import AtlasHealthCard from "@/components/atlas/AtlasHealthCard";
import AtlasPriorityCard from "@/components/atlas/AtlasPriorityCard";
import AtlasRecommendations from "@/components/atlas/AtlasRecommendations";
import { createAtlasSnapshot } from "@/lib/intelligence/atlasEngine";

interface TodayPageProps {
  customers: Lead[];
  onOpenCustomer(customer: Lead): void;
}

function formatCustomerValue(
  value: Lead["value"]
): string {
  if (typeof value === "number") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  }

  return value || "$0";
}

export default function TodayPage({
  customers,
  onOpenCustomer,
}: TodayPageProps) {
  if (customers.length === 0) {
    return (
      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">
          Atlas
        </p>

        <h2 className="mt-3 text-3xl font-bold text-slate-950">
          Your business is ready.
        </h2>

        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-slate-600">
          Customer intelligence will appear here as
          EMBUR begins receiving activity.
        </p>
      </section>
    );
  }

  const atlas = createAtlasSnapshot(customers);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[1.7fr_0.8fr]">
        <AtlasPriorityCard
          customer={atlas.topPriority.customer}
          score={atlas.topPriority.score}
          confidence={
            atlas.topPriority.confidence
          }
          riskLevel={
            atlas.topPriority.riskLevel
          }
          estimatedValue={
            atlas.topPriority.estimatedValue
          }
          reason={atlas.topPriority.reason}
          recommendedAction={
            atlas.topPriority.recommendedAction
          }
          onOpenCustomer={onOpenCustomer}
        />

        <AtlasHealthCard
          score={atlas.businessHealth}
          summary={
            atlas.businessHealthSummary
          }
        />
      </div>

      <AtlasForecastGrid
        pipeline={atlas.forecast.pipeline}
        expectedRevenue={
          atlas.forecast.expectedRevenue
        }
        expectedAppointments={
          atlas.forecast.expectedAppointments
        }
        revenueAtRisk={atlas.revenueAtRisk}
      />

      <AtlasRecommendations
        recommendations={
          atlas.recommendations
        }
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">
          Live Activity
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
          Active customers
        </h2>

        <div className="mt-7 space-y-4">
          {customers.map((customer) => (
            <button
              key={customer.id}
              type="button"
              onClick={() =>
                onOpenCustomer(customer)
              }
              className="flex w-full items-center justify-between gap-5 rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-blue-300 hover:bg-slate-50"
            >
              <div>
                <h3 className="text-lg font-semibold text-slate-950">
                  {customer.name}
                </h3>

                <p className="mt-1 text-slate-600">
                  {customer.service}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <p className="font-semibold text-blue-700">
                  {customer.status}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {formatCustomerValue(
                    customer.value
                  )}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}