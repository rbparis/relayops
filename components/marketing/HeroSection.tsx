export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-slate-200/70"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="absolute -right-40 top-40 h-96 w-96 rounded-full bg-orange-100/70 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28 lg:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Built for local service business owners
          </div>

          <h1 className="mt-8 text-4xl font-bold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl md:text-7xl">
            Your business keeps moving.
            <br />
            <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
              Your time becomes yours again.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl">
            EMBUR recovers missed opportunities, organizes what deserves your
            attention, and carries the repetitive work that keeps following you
            home.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#time-back"
              className="inline-flex min-w-52 items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-600/15 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl"
            >
              Get My Time Back
            </a>

            <a
              href="#product"
              className="inline-flex min-w-52 items-center justify-center rounded-xl border bg-white px-8 py-4 text-lg font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
            >
              See EMBUR in Action
            </a>
          </div>

          <p className="mt-5 text-sm text-slate-500">
            No sales pressure. A conversation about your business and your
            time.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-4 sm:grid-cols-3">
          <HeroProof
            value="$3,250"
            label="Revenue recovered yesterday"
          />

          <HeroProof
            value="2h 18m"
            label="Time returned yesterday"
          />

          <HeroProof
            value="1"
            label="Priority needing attention"
          />
        </div>
      </div>
    </section>
  );
}

function HeroProof({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-white/80 bg-white/80 p-5 text-left shadow-sm backdrop-blur-sm">
      <p className="text-2xl font-bold tracking-tight text-slate-950">
        {value}
      </p>

      <p className="mt-1 text-sm leading-relaxed text-slate-500">
        {label}
      </p>
    </div>
  );
}