import type { Lead } from "@/types";
import AtlasMorningBrief from "@/components/atlas/AtlasMorningBrief";

interface TodayPageProps {
  customers: Lead[];
  onOpenCustomer(customer: Lead): void;
}

function formatCustomerValue(value: Lead["value"]): string {
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
  return (
    <div className="space-y-8">
      <AtlasMorningBrief customers={customers} />

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">
            Live Activity
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Customers needing attention
          </h2>
        </div>

        <div className="mt-8 space-y-4">
          {customers.map((customer) => (
            <button
              key={customer.id}
              type="button"
              onClick={() => onOpenCustomer(customer)}
              className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-blue-300 hover:bg-slate-50"
            >
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {customer.name}
                </h3>

                <p className="mt-1 text-slate-600">
                  {customer.service}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-blue-700">
                  {customer.status}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {formatCustomerValue(customer.value)}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}