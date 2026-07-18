"use client";

import {
  useEffect,
  useState,
} from "react";
import {
  fetchAtlasTimeline,
  type AtlasTimelineItem,
} from "@/services/atlasTimelineApi";

type TimelineStatus =
  | "loading"
  | "ready"
  | "error";

export default function AtlasTimeline() {
  const [items, setItems] = useState<
    AtlasTimelineItem[]
  >([]);

  const [status, setStatus] =
    useState<TimelineStatus>("loading");

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadTimeline() {
      try {
        const timeline =
          await fetchAtlasTimeline();

        if (!active) {
          return;
        }

        setItems(timeline);
        setStatus("ready");
      } catch (error) {
        console.error(
          "Failed to load Atlas timeline:",
          error
        );

        if (!active) {
          return;
        }

        setStatus("error");

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Atlas Timeline could not be loaded."
        );
      }
    }

    void loadTimeline();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
        Atlas Timeline
      </p>

      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
        What happened
      </h2>

      <p className="mt-3 max-w-3xl leading-relaxed text-slate-600">
        Customer communication and Atlas
        decisions in one continuous history.
      </p>

      {status === "loading" && (
        <p className="mt-8 font-semibold text-slate-500">
          Loading business activity...
        </p>
      )}

      {status === "error" && (
        <p className="mt-8 font-semibold text-red-700">
          {errorMessage}
        </p>
      )}

      {status === "ready" &&
        items.length === 0 && (
          <div className="mt-8 rounded-2xl bg-slate-50 p-6 text-slate-600">
            Activity will appear here as
            customers communicate and Atlas
            decisions are recorded.
          </div>
        )}

      {status === "ready" &&
        items.length > 0 && (
          <div className="relative mt-8 space-y-6 before:absolute before:bottom-3 before:left-[19px] before:top-3 before:w-px before:bg-slate-200">
            {items.map((item) => (
              <TimelineRow
                key={item.id}
                item={item}
              />
            ))}
          </div>
        )}
    </section>
  );
}

function TimelineRow({
  item,
}: {
  item: AtlasTimelineItem;
}) {
  return (
    <article className="relative flex gap-5">
      <div
        className={`relative z-10 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white text-sm font-bold ${getIconStyles(
          item.type
        )}`}
      >
        {getIcon(item.type)}
      </div>

      <div className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-bold text-slate-950">
              {item.title}
            </p>

            {item.customerName && (
              <p className="mt-1 text-sm font-semibold text-blue-700">
                {item.customerName}
              </p>
            )}
          </div>

          <time className="shrink-0 text-xs font-semibold text-slate-500">
            {formatDate(item.occurredAt)}
          </time>
        </div>

        <p className="mt-3 leading-relaxed text-slate-600">
          {item.description}
        </p>

        {item.estimatedValue !== null &&
          item.estimatedValue > 0 && (
            <p className="mt-3 text-sm font-bold text-slate-800">
              Opportunity:{" "}
              {formatCurrency(
                item.estimatedValue
              )}
            </p>
          )}
      </div>
    </article>
  );
}

function getIcon(
  type: AtlasTimelineItem["type"]
): string {
  switch (type) {
    case "action-approved":
      return "✓";

    case "action-skipped":
      return "—";

    case "action-pending":
      return "!";

    default:
      return "↔";
  }
}

function getIconStyles(
  type: AtlasTimelineItem["type"]
): string {
  switch (type) {
    case "action-approved":
      return "bg-green-100 text-green-800";

    case "action-skipped":
      return "bg-slate-200 text-slate-700";

    case "action-pending":
      return "bg-amber-100 text-amber-800";

    default:
      return "bg-blue-100 text-blue-800";
  }
}

function formatCurrency(
  value: number
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(
  value: string
): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}