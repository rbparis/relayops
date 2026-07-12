import { getBusinessPulse } from "@/services/businessPulseService";

export default function BusinessPulse() {
  const pulse = getBusinessPulse();

  const styles = {
    healthy: {
      border: "border-green-200",
      bg: "bg-green-50",
      badge: "bg-green-600",
      text: "text-green-900",
    },
    busy: {
      border: "border-yellow-200",
      bg: "bg-yellow-50",
      badge: "bg-yellow-500",
      text: "text-yellow-900",
    },
    attention: {
      border: "border-red-200",
      bg: "bg-red-50",
      badge: "bg-red-600",
      text: "text-red-900",
    },
  };

  const style = styles[pulse.status];

  return (
    <section
      className={`rounded-3xl border ${style.border} ${style.bg} p-6 shadow-sm md:p-8`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`h-4 w-4 rounded-full ${style.badge} animate-pulse`}
        />

        <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-600">
          Business Pulse™
        </p>
      </div>

      <h3 className={`mt-4 text-3xl font-bold ${style.text}`}>
        {pulse.title}
      </h3>

      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        {pulse.message}
      </p>
    </section>
  );
}