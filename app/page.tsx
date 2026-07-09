import MorningBrief from "@/components/MorningBrief";
import DashboardPreview from "@/components/DashboardPreview";
import ConversationPreview from "@/components/ConversationPreview";
import LeadDetailPreview from "@/components/LeadDetailPreview";
import AppShellPreview from "@/components/app/AppShellPreview";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-700 flex items-center gap-3">
          <img
            src="/embur-logo.png"
            alt="EMBUR logo"
            className="h-9 w-9 rounded-lg object-contain"
          />
          <span>EMBUR</span>
        </h1>

        <div className="hidden md:flex items-center gap-8 text-slate-600 font-medium">
          <a href="#features" className="hover:text-blue-700 transition">
            Features
          </a>
          <a href="#dashboard" className="hover:text-blue-700 transition">
            Dashboard
          </a>
          <a href="#pricing" className="hover:text-blue-700 transition">
            Pricing
          </a>
        </div>

        <button className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 transition">
          Book a Demo
        </button>
      </nav>

      <section className="max-w-6xl mx-auto px-8 py-20 text-center">
        <h2 className="text-5xl font-bold leading-tight">
          Every Missed Call Could Cost Thousands.
          <br />
          EMBUR Makes Sure It Doesn&apos;t.
        </h2>

        <p className="mt-8 text-xl text-slate-600 max-w-3xl mx-auto">
          Never lose another lead because someone missed the phone. EMBUR
          follows up automatically, captures customer information, and keeps
          your schedule full.
        </p>

        <button className="mt-10 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white hover:bg-blue-700 transition">
          Book Your Free Demo
        </button>
      </section>

      <AppShellPreview />
      <MorningBrief />
      <DashboardPreview />
      <ConversationPreview />
      <LeadDetailPreview />

      <section id="features" className="max-w-6xl mx-auto px-8 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">
          See EMBUR in Action
        </h3>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            "Missed Call Recovery",
            "Instant Follow-Ups",
            "Lead Dashboard",
            "Review Requests",
          ].map((feature) => (
            <div
              key={feature}
              className="rounded-xl bg-white p-6 shadow-sm border"
            >
              <h4 className="font-semibold text-lg">{feature}</h4>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t py-10 text-center text-slate-500">
        © {new Date().getFullYear()} EMBUR. Built for HVAC companies.
      </footer>
    </main>
  );
}