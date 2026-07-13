"use client";

import type { Lead } from "@/types";
import {
  rankOpportunities,
  type OpportunityCustomer,
  type OpportunityLevel,
} from "@/services/atlas/opportunityEngine";

type OpportunityBoardProps = {
  customers: Lead[];
  onOpenCustomer: (customer: Lead) => void;
};

export default function OpportunityBoard({
  customers,
  onOpenCustomer,
}: OpportunityBoardProps) {
  const opportunities = rankOpportunities(customers);

  if (opportunities.length === 0) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
          Opportunity Engine
        </p>

        <h3 className="mt-3 text-3xl font-bold text-slate-950">
          No active opportunities.
        </h3>

        <p className="mt-3 text-slate-500">
          Atlas will rank new customers as soon as they arrive.
        </p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
      <header className="border-b border-slate-200 px-6 py-6 md:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">
              Opportunity Engine™
            </p>

            <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
              Where attention creates the most value
            </h3>

            <p className="mt-3 max-w-2xl leading-relaxed text-slate-500">
              Atlas ranks each customer using urgency, status, and
              estimated opportunity value.
            </p>
          </div>

          <div className="w-fit rounded-2xl bg-slate-950 px-5 py-3 text-white">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Opportunities
            </p>

            <p className="mt-1 text-2xl font-bold">
              {opportunities.length}
            </p>
          </div>
        </div>
      </header>

      <div className="divide-y divide-slate-200">
        {opportunities.map((opportunity, index) => (
          <OpportunityRow
            key={opportunity.id}
            opportunity={opportunity}
            rank={index + 1}
            onOpen={() => onOpenCustomer(opportunity)}
          />
        ))}
      </div>

      <footer className="bg-slate-50 px-6 py-4 text-xs leading-relaxed text-slate-400 md:px-8">
        Opportunity scores are transparent operating estimates based
        on current EMBUR data. They are not guarantees of revenue or
        customer conversion.
      </footer>
    </section>
  );
}

function OpportunityRow({
  opportunity,
  rank,
  onOpen,
}: {
  opportunity: OpportunityCustomer;
  rank: number;
  onOpen: () => void;
}) {
  return (
    <article className="p-6 transition hover:bg-slate-50 md:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-lg font-bold text-white">
            {rank}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h4 className="text-xl font-bold text-slate-950">
                {opportunity.name}
              </h4>

              <OpportunityBadge level={opportunity.level}>
                {opportunity.levelLabel}
              </OpportunityBadge>
            </div>

            <p className="mt-1 text-slate-500">
              {opportunity.service}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {opportunity.reasons.map((reason) => (
                <span
                  key={reason}
                  className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600"
                >
                  {reason}
                </span>
              ))}
            </div>

            <p className="mt-4 text-sm font-semibold text-blue-700">
              {opportunity.recommendedAction}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center">
          <div className="grid grid-cols-2 gap-3">
            <Metric
              label="Score"
              value={`${opportunity.opportunityScore}`}
            />

            <Metric
              label="Value"
              value={formatCurrency(opportunity.estimatedValue)}
            />
          </div>

          <button
            type="button"
            onClick={onOpen}
            className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            Open Customer →
          </button>
        </div>
      </div>
    </article>
  );
}

function OpportunityBadge({
  level,
  children,
}: {
  level: OpportunityLevel;
  children: string;
}) {
  const styles: Record<OpportunityLevel, string> = {
    critical: "bg-red-100 text-red-800",
    high: "bg-orange-100 text-orange-800",
    active: "bg-blue-100 text-blue-800",
    secured: "bg-green-100 text-green-800",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${styles[level]}`}
    >
      {children}
    </span>
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
    <div className="min-w-24 rounded-2xl bg-slate-50 px-4 py-3 text-center">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-lg font-bold text-slate-950">
        {value}
      </p>
    </div>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}