import {
  getTimeLedger,
  getTodayTimeReturned,
} from "@/services/timeLedgerService";

export default function TimeLedger() {
  const entries = getTimeLedger();
  const total = getTodayTimeReturned();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">
            Time Ledger™
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            What EMBUR handled today
          </h3>
        </div>

        <div className="rounded-2xl bg-orange-50 px-5 py-3 text-center">
          <p className="text-xs font-bold uppercase text-orange-600">
            Time Returned
          </p>

          <p className="mt-1 text-3xl font-bold">
            +{total} min
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-5">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="flex items-start justify-between rounded-2xl bg-slate-50 p-5"
          >
            <div>
              <p className="text-sm text-slate-500">
                {entry.time}
              </p>

              <p className="mt-1 font-bold text-lg">
                {entry.title}
              </p>

              <p className="mt-2 text-slate-600">
                {entry.description}
              </p>
            </div>

            <div className="rounded-xl bg-green-100 px-4 py-2 font-bold text-green-700">
              +{entry.minutesReturned} min
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}