import EmburLogo from "@/components/brand/EmburLogo";

const navigation = [
  {
    label: "Why EMBUR",
    href: "#why-embur",
  },
  {
    label: "See EMBUR",
    href: "#product",
  },
  {
    label: "Your Time Back",
    href: "#your-time-back",
  },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-slate-50/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a
          href="#top"
          aria-label="Return to the EMBUR homepage"
          className="shrink-0"
        >
          <EmburLogo />
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-slate-600 transition hover:text-blue-700"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#time-back"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md"
          >
            Get My Time Back
          </a>
        </div>

        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-xl border bg-white px-4 py-3 font-semibold text-slate-900 shadow-sm">
            Menu
          </summary>

          <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border bg-white p-3 shadow-xl">
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-1"
            >
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-50 hover:text-blue-700"
                >
                  {item.label}
                </a>
              ))}

              <a
                href="#time-back"
                className="mt-2 rounded-xl bg-blue-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
              >
                Get My Time Back
              </a>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}