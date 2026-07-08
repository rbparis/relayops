export default function MorningBrief() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-20">
      <div className="rounded-3xl border bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-8 shadow-2xl text-white">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-blue-200 font-semibold">Today&apos;s Operations Brief</p>

            <h3 className="mt-3 text-5xl font-bold">
              🌅 Good morning, Mike.
            </h3>

            <p className="mt-4 text-slate-300">
              Tuesday • 6:42 AM
            </p>

            <div className="mt-10">
              <p className="text-lg text-slate-200">
                Yesterday, RelayOps recovered
              </p>

              <p className="mt-3 text-6xl font-bold text-white">
                $3,250
              </p>

              <p className="mt-3 text-lg text-slate-300">
                that would have otherwise been lost.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white/10 p-6 min-w-72">
            <p className="text-sm font-semibold text-blue-100">Today&apos;s Forecast</p>
            <p className="mt-3 text-3xl font-bold">☀️ 94°F</p>
            <p className="mt-3 text-slate-200">
              High AC demand expected today. Call volume may increase.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-4">
          <div className="rounded-2xl bg-white/10 p-5">
            <p className="text-2xl">✅</p>
            <p className="mt-3 font-bold">6 missed callers</p>
            <p className="text-sm text-slate-300">contacted automatically</p>
          </div>

          <div className="rounded-2xl bg-white/10 p-5">
            <p className="text-2xl">📅</p>
            <p className="mt-3 font-bold">4 appointments</p>
            <p className="text-sm text-slate-300">booked from recovered leads</p>
          </div>

          <div className="rounded-2xl bg-white/10 p-5">
            <p className="text-2xl">⭐</p>
            <p className="mt-3 font-bold">3 review requests</p>
            <p className="text-sm text-slate-300">sent after completed jobs</p>
          </div>

          <div className="rounded-2xl bg-yellow-400/20 p-5">
            <p className="text-2xl">⚠️</p>
            <p className="mt-3 font-bold">2 customers</p>
            <p className="text-sm text-yellow-100">still need attention</p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl bg-white p-6 text-slate-900">
          <p className="text-sm font-bold text-red-600">TODAY&apos;S FIRST PRIORITY</p>

          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h4 className="text-3xl font-bold">Mike Brown</h4>
              <p className="mt-2 text-slate-600">Emergency AC Repair • Waiting 11 hours</p>
              <p className="mt-3 font-semibold">
                Potential revenue: <span className="text-green-700">$1,250</span>
              </p>
            </div>

            <button className="rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white hover:bg-blue-700 transition">
              Call Customer Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}