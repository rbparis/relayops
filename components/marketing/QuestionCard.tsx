"use client";

import type { ReactNode } from "react";

type QuestionCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
};

export default function QuestionCard({
  eyebrow,
  title,
  description,
  children,
  currentStep,
  totalSteps,
  onBack,
}: QuestionCardProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
      <div className="border-b border-slate-200 bg-slate-950 px-6 py-6 text-white md:px-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
              Time Return Experience
            </p>

            <p className="mt-1 text-sm text-slate-400">
              One simple question at a time
            </p>
          </div>

          <p className="shrink-0 text-sm font-semibold text-slate-300">
            {currentStep} of {totalSteps}
          </p>
        </div>

        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-300 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="p-6 md:p-10">
        <div
          key={currentStep}
          className="animate-[emburReveal_420ms_ease-out]"
        >
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
            {eyebrow}
          </p>

          <h3 className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-slate-950 md:text-4xl">
            {title}
          </h3>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            {description}
          </p>

          <div className="mt-9">{children}</div>

          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="mt-8 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              ← Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}