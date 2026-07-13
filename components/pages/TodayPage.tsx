import type { Lead } from "@/types";
import AtlasBriefCard from "@/components/atlas/AtlasBriefCard";
import OpportunityBoard from "@/components/atlas/OpportunityBoard";
import BusinessPulse from "@/components/morning/BusinessPulse";
import MorningMetrics from "@/components/morning/MorningMetrics";
import OnePriorityCard from "@/components/morning/OnePriorityCard";
import TimeLedger from "@/components/morning/TimeLedger";
import { buildAtlasBrief } from "@/services/atlas/atlasEngine";
import { getMorningBrief } from "@/services/morningService";
import {
  getHighestPriorityCustomer,
  type PriorityCustomer,
} from "@/services/priorityService";

type TodayPageProps = {
  customers: Lead[];
  onOpenCustomer: (customer: Lead) => void;
};

export default function TodayPage({
  customers,
  onOpenCustomer,
}: TodayPageProps) {
  const morningBrief = getMorningBrief();

  const priority =
    getHighestPriorityCustomer(customers);

  const atlasBrief = buildAtlasBrief({
    customers,
    ownerName: morningBrief.ownerName,
    timeReturnedMinutes: 138,
  });

  function handleOpenPriority(
    customer: PriorityCustomer
  ) {
    onOpenCustomer(customer);
  }

  return (
    <div className="mt-8 space-y-6">
      <AtlasBriefCard
        brief={atlasBrief}
        onOpenCustomer={onOpenCustomer}
      />

      <OnePriorityCard
        priority={priority}
        onOpenCustomer={handleOpenPriority}
      />

      <OpportunityBoard
        customers={customers}
        onOpenCustomer={onOpenCustomer}
      />

      <BusinessPulse />

      <MorningMetrics
        metrics={morningBrief.metrics}
      />

      <TimeLedger />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm md:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
          Everything else
        </p>

        <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
          Is already handled.
        </h3>

        <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-slate-600">
          Atlas will continue watching customers, conversations,
          follow-ups, appointments, and business activity throughout
          the day.
        </p>

        <p className="mt-6 text-lg font-semibold text-slate-950">
          Go run your business.
        </p>
      </section>
    </div>
  );
}