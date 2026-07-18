"use client";

import {
  useEffect,
  useState,
} from "react";
import type { AtlasRecommendation } from "@/lib/intelligence/types";
import {
  fetchAtlasActions,
  saveAtlasAction,
  type StoredAtlasActionStatus,
} from "@/services/atlasActionsApi";

type AtlasActionQueueProps = {
  recommendations: AtlasRecommendation[];
};

type ActionState = Record<
  string,
  StoredAtlasActionStatus
>;

export default function AtlasActionQueue({
  recommendations,
}: AtlasActionQueueProps) {
  const [actionState, setActionState] =
    useState<ActionState>({});

  const [loading, setLoading] =
    useState(true);

  const [savingId, setSavingId] =
    useState<string | null>(null);

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadActions() {
      try {
        const storedActions =
          await fetchAtlasActions();

        if (!active) {
          return;
        }

        const nextState =
          storedActions.reduce<ActionState>(
            (state, action) => {
              state[
                action.recommendationId
              ] = action.status;

              return state;
            },
            {}
          );

        setActionState(nextState);
      } catch (error) {
        console.error(
          "Failed to load Atlas Action history:",
          error
        );

        if (!active) {
          return;
        }

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Atlas Action history could not be loaded."
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadActions();

    return () => {
      active = false;
    };
  }, []);

  async function updateAction(
    recommendation: AtlasRecommendation,
    status: StoredAtlasActionStatus
  ) {
    setSavingId(recommendation.id);
    setErrorMessage(null);

    try {
      const savedAction =
        await saveAtlasAction(
          recommendation,
          status
        );

      setActionState((current) => ({
        ...current,
        [recommendation.id]:
          savedAction.status,
      }));
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Atlas Action could not be saved."
      );
    } finally {
      setSavingId(null);
    }
  }

  const approvedCount =
    recommendations.filter(
      (recommendation) =>
        actionState[recommendation.id] ===
        "approved"
    ).length;

  const pendingCount =
    recommendations.filter(
      (recommendation) =>
        !actionState[recommendation.id] ||
        actionState[recommendation.id] ===
          "pending"
    ).length;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">
            Atlas Action Queue
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
            Approve today&apos;s next moves
          </h2>

          <p className="mt-3 max-w-3xl leading-relaxed text-slate-600">
            Atlas prepares the work. Every decision is
            permanently recorded for this company.
          </p>
        </div>

        <div className="flex shrink-0 gap-3">
          <QueueMetric
            label="Pending"
            value={pendingCount}
          />

          <QueueMetric
            label="Approved"
            value={approvedCount}
          />
        </div>
      </div>

      {loading ? (
        <p className="mt-8 font-semibold text-slate-500">
          Loading Atlas Action history...
        </p>
      ) : (
        <div className="mt-8 space-y-4">
          {recommendations.map(
            (recommendation, index) => {
              const status =
                actionState[
                  recommendation.id
                ] ?? "pending";

              const isSaving =
                savingId === recommendation.id;

              return (
                <article
                  key={recommendation.id}
                  className={`rounded-2xl border p-5 transition ${
                    status === "approved"
                      ? "border-green-300 bg-green-50"
                      : status === "skipped"
                        ? "border-slate-200 bg-slate-50 opacity-70"
                        : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 font-bold text-white">
                        {index + 1}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold text-slate-950">
                            {
                              recommendation.title
                            }
                          </h3>

                          <StatusBadge
                            status={status}
                          />
                        </div>

                        <p className="mt-2 leading-relaxed text-slate-600">
                          {
                            recommendation.description
                          }
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-800">
                            {recommendation.actionType.replace(
                              "_",
                              " "
                            )}
                          </span>

                          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange-800">
                            {
                              recommendation.riskLevel
                            }{" "}
                            risk
                          </span>

                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                            $
                            {recommendation.estimatedValue.toLocaleString(
                              "en-US"
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex shrink-0 gap-3">
                      <button
                        type="button"
                        disabled={isSaving}
                        onClick={() =>
                          void updateAction(
                            recommendation,
                            "approved"
                          )
                        }
                        className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60"
                      >
                        {isSaving
                          ? "Saving..."
                          : status ===
                              "approved"
                            ? "Approved ✓"
                            : "Approve"}
                      </button>

                      <button
                        type="button"
                        disabled={isSaving}
                        onClick={() =>
                          void updateAction(
                            recommendation,
                            "skipped"
                          )
                        }
                        className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-100 disabled:cursor-wait disabled:opacity-60"
                      >
                        {status === "skipped"
                          ? "Skipped"
                          : "Skip"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            }
          )}
        </div>
      )}

      {errorMessage && (
        <p className="mt-5 font-semibold text-red-700">
          {errorMessage}
        </p>
      )}
    </section>
  );
}

function QueueMetric({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="min-w-24 rounded-2xl bg-slate-100 px-4 py-3 text-center">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold text-slate-950">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: StoredAtlasActionStatus;
}) {
  const styles = {
    pending:
      "bg-amber-100 text-amber-800",
    approved:
      "bg-green-100 text-green-800",
    skipped:
      "bg-slate-200 text-slate-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${styles[status]}`}
    >
      {status}
    </span>
  );
}