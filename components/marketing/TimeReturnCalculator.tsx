"use client";

import { useCallback, useMemo, useState } from "react";
import QuestionCard from "@/components/marketing/QuestionCard";
import ResultsReveal from "@/components/marketing/ResultsReveal";
import TimeReportLoader from "@/components/marketing/TimeReportLoader";
import {
  calculateTimeReturn,
  formatCurrency,
  type TimeReturnInputs,
} from "@/services/timeReturnService";

type ExperienceStage =
  | "questions"
  | "analysis"
  | "results";

const initialInputs: TimeReturnInputs = {
  employees: 6,
  averageJobValue: 850,
  missedCallsPerWeek: 12,
  ownerHoursPerWeek: 58,
};

const teamOptions = [
  { label: "Just me", value: 1 },
  { label: "2–4 people", value: 3 },
  { label: "5–10 people", value: 7 },
  { label: "11–25 people", value: 18 },
  { label: "26+ people", value: 30 },
];

const missedCallOptions = [
  { label: "Almost none", value: 1 },
  { label: "2–5 calls", value: 4 },
  { label: "6–10 calls", value: 8 },
  { label: "11–20 calls", value: 15 },
  { label: "More than 20", value: 25 },
];

const ownerHourOptions = [
  { label: "Under 40 hours", value: 35 },
  { label: "40–50 hours", value: 45 },
  { label: "51–60 hours", value: 56 },
  { label: "61–70 hours", value: 66 },
  { label: "More than 70", value: 75 },
];

export default function TimeReturnCalculator() {
  const [stage, setStage] =
    useState<ExperienceStage>("questions");

  const [step, setStep] = useState(1);

  const [inputs, setInputs] =
    useState<TimeReturnInputs>(initialInputs);

  const results = useMemo(
    () => calculateTimeReturn(inputs),
    [inputs]
  );

  function updateInput(
    field: keyof TimeReturnInputs,
    value: number
  ) {
    setInputs((current) => ({
      ...current,
      [field]: Math.max(value, 0),
    }));
  }

  function goForward() {
    if (step < 4) {
      setStep((current) => current + 1);
      return;
    }

    setStage("analysis");
  }

  function goBack() {
    setStep((current) => Math.max(current - 1, 1));
  }

  const finishAnalysis = useCallback(() => {
    setStage("results");
  }, []);

  function restartExperience() {
    setStage("questions");
    setStep(1);
  }

  return (
    <section
      id="your-time-back"
      className="scroll-mt-24 border-y border-slate-200 bg-gradient-to-b from-white to-slate-50 px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
            The Time Return Experience
          </p>

          <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-950 md:text-5xl">
            What could your business give back to you?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            Four simple questions. One clearer picture of the time and
            opportunity that may be hiding inside your business.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl">
          {stage === "questions" && step === 1 && (
            <QuestionCard
              eyebrow="Your team"
              title="How many people keep the business moving?"
              description="Include office staff, technicians, managers, and yourself."
              currentStep={1}
              totalSteps={4}
            >
              <OptionGrid
                options={teamOptions}
                selectedValue={inputs.employees}
                onSelect={(value) => {
                  updateInput("employees", value);
                  window.setTimeout(goForward, 180);
                }}
              />
            </QuestionCard>
          )}

          {stage === "questions" && step === 2 && (
            <QuestionCard
              eyebrow="Your customers"
              title="About how much is an average completed job worth?"
              description="Use a practical average—not your smallest service call or largest installation."
              currentStep={2}
              totalSteps={4}
              onBack={goBack}
            >
              <RangeAnswer
                value={inputs.averageJobValue}
                minimum={100}
                maximum={10000}
                step={50}
                displayValue={formatCurrency(
                  inputs.averageJobValue
                )}
                minimumLabel="$100"
                maximumLabel="$10,000+"
                onChange={(value) =>
                  updateInput("averageJobValue", value)
                }
                onContinue={goForward}
              />
            </QuestionCard>
          )}

          {stage === "questions" && step === 3 && (
            <QuestionCard
              eyebrow="Missed opportunity"
              title="How many customer calls might go unanswered each week?"
              description="Think about busy hours, evenings, weekends, and times when everyone is already helping someone."
              currentStep={3}
              totalSteps={4}
              onBack={goBack}
            >
              <OptionGrid
                options={missedCallOptions}
                selectedValue={inputs.missedCallsPerWeek}
                onSelect={(value) => {
                  updateInput("missedCallsPerWeek", value);
                  window.setTimeout(goForward, 180);
                }}
              />
            </QuestionCard>
          )}

          {stage === "questions" && step === 4 && (
            <QuestionCard
              eyebrow="Your workload"
              title="How many hours does the business ask from you each week?"
              description="Include early mornings, evenings, weekends, calls, paperwork, and the time you spend thinking about work."
              currentStep={4}
              totalSteps={4}
              onBack={goBack}
            >
              <OptionGrid
                options={ownerHourOptions}
                selectedValue={inputs.ownerHoursPerWeek}
                onSelect={(value) => {
                  updateInput("ownerHoursPerWeek", value);
                  window.setTimeout(goForward, 180);
                }}
              />
            </QuestionCard>
          )}

          {stage === "analysis" && (
            <TimeReportLoader onComplete={finishAnalysis} />
          )}

          {stage === "results" && (
            <ResultsReveal
              results={results}
              onRestart={restartExperience}
            />
          )}
        </div>
      </div>

      <style>{`
        @keyframes emburReveal {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.99);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
}

function OptionGrid({
  options,
  selectedValue,
  onSelect,
}: {
  options: Array<{
    label: string;
    value: number;
  }>;
  selectedValue: number;
  onSelect: (value: number) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {options.map((option) => {
        const isSelected = selectedValue === option.value;

        return (
          <button
            type="button"
            key={option.label}
            onClick={() => onSelect(option.value)}
            className={`group flex min-h-24 items-center justify-between rounded-2xl border p-5 text-left transition-all duration-200 ${
              isSelected
                ? "border-blue-600 bg-blue-50 shadow-md"
                : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
            }`}
          >
            <span
              className={`text-lg font-bold ${
                isSelected
                  ? "text-blue-950"
                  : "text-slate-900"
              }`}
            >
              {option.label}
            </span>

            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
                isSelected
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-700"
              }`}
            >
              {isSelected ? "✓" : "→"}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function RangeAnswer({
  value,
  minimum,
  maximum,
  step,
  displayValue,
  minimumLabel,
  maximumLabel,
  onChange,
  onContinue,
}: {
  value: number;
  minimum: number;
  maximum: number;
  step: number;
  displayValue: string;
  minimumLabel: string;
  maximumLabel: string;
  onChange: (value: number) => void;
  onContinue: () => void;
}) {
  return (
    <div>
      <div className="rounded-3xl bg-slate-50 p-6 text-center md:p-8">
        <p className="text-sm font-semibold text-slate-500">
          Average completed job
        </p>

        <p className="mt-3 text-5xl font-bold tracking-tight text-slate-950 md:text-6xl">
          {displayValue}
        </p>

        <input
          aria-label="Average completed job value"
          type="range"
          min={minimum}
          max={maximum}
          step={step}
          value={value}
          onChange={(event) =>
            onChange(Number(event.target.value))
          }
          className="mt-9 w-full cursor-pointer accent-blue-600"
        />

        <div className="mt-3 flex justify-between text-sm font-medium text-slate-400">
          <span>{minimumLabel}</span>
          <span>{maximumLabel}</span>
        </div>
      </div>

      <div className="mt-7 flex justify-end">
        <button
          type="button"
          onClick={onContinue}
          className="rounded-xl bg-blue-600 px-7 py-4 font-bold text-white shadow-lg shadow-blue-600/15 transition hover:-translate-y-0.5 hover:bg-blue-700"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}