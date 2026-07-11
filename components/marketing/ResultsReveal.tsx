"use client";

import { useEffect, useState } from "react";
import TimeSummaryCard from "@/components/marketing/TimeSummaryCard";
import {
  formatCurrency,
  formatNumber,
  type TimeReturnResults,
} from "@/services/timeReturnService";

type ResultsRevealProps = {
  results: TimeReturnResults;
  onRestart: () => void;
};

export default function ResultsReveal({
  results,
  onRestart,
}: ResultsRevealProps) {
  const [showContext, setShowContext] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showAction, setShowAction] = useState(false);

  useEffect(() => {
    const contextTimer = window.setTimeout(() => {
      setShowContext(true);
    }, 700);

    const detailsTimer = window.setTimeout(() => {
      setShowDetails(true);
    }, 1450);

    const actionTimer = window.setTimeout(() => {
      setShowAction(true);
    }, 2250);

    return () => {
      window.clearTimeout(contextTimer);
      window.clearTimeout(detailsTimer);
      window.clearTimeout(actionTimer);
    };
  }, []);

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-orange-500 to-amber-300 px-6 py-14 text-center text-slate-950 shadow-2xl md:px-12 md:py-20">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-36 -left-20 h-80 w-80 rounded-full bg-white/15 blur-3xl" />

        <div className="relative">
          <p className="animate-[emburReveal_500ms_ease-out] text-sm font-bold uppercase tracking-[0.18em]">
            Your business could get back
          </p>

          <p className="mt-6 animate-[emburReveal_700ms_ease-out] text-7xl font-bold tracking-[-0.06em] sm:text-8xl md:text-9xl">
            {formatNumber(results.annualHoursReturned)}
          </p>

          <p className="mt-3 animate-[emburReveal_700ms_ease-out] text-2xl font-bold md:text-3xl">
            hours every year.
          </p>

          <div
            className={`transition-all duration-700 ${
              showContext
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <div className="mx-auto mt-9 max-w-2xl border-t border-slate-950/15 pt-8">
              <p className="text-2xl font-bold md:text-3xl">
                That&apos;s approximately{" "}
                {results.workWeeksReturned.toFixed(1)} full work weeks.
              </p>

              <p className="mt-5 text-lg leading-relaxed text-slate-900/75">
                Imagine what you could do with that time—your family, your
                health, your team, your future, or simply a life that does not
                follow you home every night.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        className={`transition-all duration-700 ${
          showDetails
            ? "translate-y-0 opacity-100"
            : "translate-y-5 opacity-0"
        }`}
      >
        <TimeSummaryCard results={results} />

        <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <p className="font-bold text-blue-950">
            Missed-call opportunity identified
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-blue-900">
            {formatCurrency(results.annualMissedCallOpportunity)}
          </p>

          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-blue-800">
            This is the estimated annual value associated with missed calls
            before applying EMBUR&apos;s recoverable-rate assumption.
          </p>
        </div>
      </div>

      <div
        className={`rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-700 md:p-8 ${
          showAction
            ? "translate-y-0 opacity-100"
            : "translate-y-5 opacity-0"
        }`}
      >
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
          Your time return starts here
        </p>

        <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
          Let&apos;s turn this estimate into a plan.
        </h3>

        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-slate-600">
          Tell us about your business and we&apos;ll begin preparing a more
          personal Time Return Report.
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#time-back"
            className="rounded-xl bg-blue-600 px-7 py-4 font-bold text-white shadow-lg shadow-blue-600/15 transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            Let&apos;s Get My Time Back
          </a>

          <button
            type="button"
            onClick={onRestart}
            className="rounded-xl border border-slate-200 bg-white px-7 py-4 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Recalculate
          </button>
        </div>
      </div>

      <p className="text-center text-xs leading-relaxed text-slate-400">
        Estimates are directional and based on the information supplied and
        prototype assumptions. Actual results vary by business, market,
        customer demand, implementation, and operating model.
      </p>
    </div>
  );
}