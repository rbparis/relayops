const pillars = [
  {
    number: "01",
    title: "Recover",
    description:
      "Turn missed calls and forgotten follow-ups into opportunities before they disappear.",
  },
  {
    number: "02",
    title: "Organize",
    description:
      "Know what deserves attention without searching through disconnected systems.",
  },
  {
    number: "03",
    title: "Return",
    description:
      "Let EMBUR carry repetitive office work and return those hours to the owner.",
  },
  {
    number: "04",
    title: "Grow",
    description:
      "Build a business that keeps moving without depending on you every minute.",
  },
];

export default function WhyEmburSection() {
  return (
    <section
      id="why-embur"
      className="scroll-mt-24 px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
              Why EMBUR exists
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-slate-950 md:text-5xl">
              Revenue proves it works.
              <br />
              Time returned is the product.
            </h2>
          </div>

          <div className="lg:pb-1">
            <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
              Local service business owners deserve the operational advantage
              of a national company without sacrificing their health, family,
              or life to create it.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="group rounded-3xl border bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-orange-600">
                  {pillar.number}
                </p>

                <span className="h-2 w-2 rounded-full bg-slate-200 transition group-hover:bg-orange-400" />
              </div>

              <h3 className="mt-8 text-2xl font-bold text-slate-950">
                {pillar.title}
              </h3>

              <p className="mt-3 leading-relaxed text-slate-600">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid overflow-hidden rounded-3xl border bg-white shadow-sm lg:grid-cols-2">
          <div className="p-7 md:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
              The old way
            </p>

            <h3 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
              The business follows you home.
            </h3>

            <div className="mt-7 space-y-4 text-slate-600">
              <ComparisonItem text="Missed calls live in your head." />
              <ComparisonItem text="Follow-ups depend on someone remembering." />
              <ComparisonItem text="The owner becomes the system." />
              <ComparisonItem text="Growth creates more stress instead of freedom." />
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-7 text-white md:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-300">
              With EMBUR
            </p>

            <h3 className="mt-4 text-3xl font-bold tracking-tight">
              The business keeps moving.
            </h3>

            <div className="mt-7 space-y-4 text-slate-300">
              <ComparisonItem
                text="Opportunities are recovered before they disappear."
                light
              />

              <ComparisonItem
                text="The next priority is clear."
                light
              />

              <ComparisonItem
                text="Repetitive work is quietly handled."
                light
              />

              <ComparisonItem
                text="More of the owner's time belongs to them again."
                light
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonItem({
  text,
  light = false,
}: {
  text: string;
  light?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
          light
            ? "bg-orange-400/20 text-orange-300"
            : "bg-slate-100 text-slate-500"
        }`}
      >
        ✓
      </span>

      <p className="leading-relaxed">{text}</p>
    </div>
  );
}