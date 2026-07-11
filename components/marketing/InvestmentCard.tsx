const included = [
  "Missed-call recovery",
  "Customer follow-up",
  "Lead prioritization",
  "Appointment support",
  "Review requests",
  "Morning operating brief",
  "Business impact reporting",
  "Time Returned tracking",
];

export default function InvestmentCard() {
  return (
    <section
      id="investment"
      className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28"
    >
      <div className="grid overflow-hidden rounded-3xl border bg-white shadow-2xl lg:grid-cols-[1fr_0.9fr]">
        <div className="p-7 md:p-10 lg:p-12">
          <p className="text-sm font-bold uppercase tracking-wider text-blue-700">
            Your investment
          </p>

          <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-slate-950">
            One complete EMBUR experience.
          </h2>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            No confusing tiers. No choosing which part of your time
            matters. EMBUR is designed as one operating system for the
            owner.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {included.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                  ✓
                </span>

                <span className="font-medium text-slate-700">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-7 text-white md:p-10 lg:p-12">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-orange-300">
              Founding customer investment
            </p>

            <div className="mt-6 flex items-end gap-2">
              <span className="text-6xl font-bold tracking-tight">
                $497
              </span>

              <span className="pb-2 text-lg text-slate-400">
                / month
              </span>
            </div>

            <p className="mt-5 leading-relaxed text-slate-300">
              Initial pricing for early customers while EMBUR is
              refined alongside real local service businesses.
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="font-bold">The EMBUR standard</p>

              <p className="mt-2 leading-relaxed text-slate-300">
                EMBUR should create more measurable value than it
                costs. If it does not, we have not done our job.
              </p>
            </div>
          </div>

          <a
            href="#time-back"
            className="mt-8 rounded-xl bg-white px-6 py-4 text-center font-bold text-slate-950 transition hover:bg-slate-100"
          >
            Start My Time Assessment
          </a>
        </div>
      </div>

      <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-relaxed text-slate-400">
        Founding-customer pricing and included capabilities are
        subject to change as EMBUR moves through private beta.
        Service scope will be confirmed before any paid agreement.
      </p>
    </section>
  );
}