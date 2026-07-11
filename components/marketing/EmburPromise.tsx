export default function EmburPromise() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-6 py-14 text-center text-white shadow-2xl md:px-12 md:py-20">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-400/15 blur-3xl" />
        <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />

        <div className="relative">
          <p className="text-sm font-bold uppercase tracking-wider text-orange-300">
            The EMBUR promise
          </p>

          <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Your business keeps moving.
            <br />
            Your time becomes yours again.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">
            EMBUR exists to carry repetitive work, recover
            opportunities, and reduce the constant pressure of owning
            a local service business.
          </p>

          <div className="mx-auto mt-10 grid max-w-4xl gap-4 text-left sm:grid-cols-3">
            <PromiseItem
              title="Less chasing"
              description="Follow-ups and missed opportunities stop living in your head."
            />

            <PromiseItem
              title="Clearer days"
              description="You see what deserves attention instead of searching for it."
            />

            <PromiseItem
              title="More life"
              description="The hours EMBUR carries become yours to spend again."
            />
          </div>

          <a
            href="#time-back"
            className="mt-10 inline-block rounded-xl bg-white px-8 py-4 text-lg font-bold text-slate-950 transition hover:bg-slate-100"
          >
            Start My Time Assessment
          </a>
        </div>
      </div>
    </section>
  );
}

function PromiseItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <p className="font-bold text-white">{title}</p>

      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        {description}
      </p>
    </div>
  );
}