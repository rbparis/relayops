"use client";

import { useEffect, useState } from "react";

type TimeReportLoaderProps = {
  onComplete: () => void;
};

const analysisSteps = [
  "Reviewing your business workload",
  "Estimating missed opportunities",
  "Calculating repetitive work",
  "Building your Time Return estimate",
];

export default function TimeReportLoader({
  onComplete,
}: TimeReportLoaderProps) {
  const [completedSteps, setCompletedSteps] = useState(0);

  useEffect(() => {
    const stepTimer = window.setInterval(() => {
      setCompletedSteps((current) => {
        if (current >= analysisSteps.length) {
          return current;
        }

        return current + 1;
      });
    }, 650);

    const completeTimer = window.setTimeout(() => {
      onComplete();
    }, analysisSteps.length * 650 + 700);

    return () => {
      window.clearInterval(stepTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-6 py-12 text-center text-white md:px-12 md:py-16">
        <img
          src="/embur-logo.png"
          alt="EMBUR"
          className="mx-auto h-14 w-14 rounded-2xl object-contain shadow-xl"
        />

        <p className="mt-7 text-sm font-bold uppercase tracking-[0.18em] text-orange-300">
          EMBUR is reviewing your business
        </p>

        <h3 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
          Preparing your Time Return estimate...
        </h3>

        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-slate-300">
          We&apos;re translating your answers into a clearer picture of where
          time and opportunity may be waiting.
        </p>
      </div>

      <div className="p-6 md:p-10">
        <div className="space-y-4">
          {analysisSteps.map((step, index) => {
            const isComplete = index < completedSteps;
            const isActive = index === completedSteps;

            return (
              <div
                key={step}
                className={`flex items-center gap-4 rounded-2xl border p-5 transition-all duration-500 ${
                  isComplete
                    ? "border-green-200 bg-green-50"
                    : isActive
                      ? "border-blue-200 bg-blue-50"
                      : "border-slate-200 bg-slate-50 opacity-60"
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-500 ${
                    isComplete
                      ? "bg-green-600 text-white"
                      : isActive
                        ? "bg-blue-600 text-white"
                        : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {isComplete ? "✓" : index + 1}
                </span>

                <div>
                  <p
                    className={`font-semibold ${
                      isComplete
                        ? "text-green-900"
                        : isActive
                          ? "text-blue-950"
                          : "text-slate-500"
                    }`}
                  >
                    {step}
                  </p>

                  {isActive && (
                    <p className="mt-1 text-sm text-blue-700">
                      In progress...
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-300 transition-all duration-500"
            style={{
              width: `${(completedSteps / analysisSteps.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}