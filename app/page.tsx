import AppShellPreview from "@/components/app/AppShellPreview";
import EmburLogo from "@/components/brand/EmburLogo";
import GetMyTimeBack from "@/components/journey/GetMyTimeBack";
import EmburPromise from "@/components/marketing/EmburPromise";
import HeroSection from "@/components/marketing/HeroSection";
import InvestmentCard from "@/components/marketing/InvestmentCard";
import SiteHeader from "@/components/marketing/SiteHeader";
import TimeReturnCalculator from "@/components/marketing/TimeReturnCalculator";
import WhyEmburSection from "@/components/marketing/WhyEmburSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      <HeroSection />

      <WhyEmburSection />

      <section
        id="product"
        className="scroll-mt-24 border-y border-slate-200 bg-white py-20 md:py-28"
      >
        <div className="mx-auto max-w-6xl px-5 text-center md:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
            See EMBUR working
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
            Know what matters.
            <br />
            Let EMBUR handle the rest.
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
            Step into a believable business day and experience how EMBUR helps
            the owner understand the business, act on one priority, and move
            forward with confidence.
          </p>
        </div>

        <AppShellPreview />
      </section>

      <TimeReturnCalculator />

      <InvestmentCard />

      <EmburPromise />

      <GetMyTimeBack />

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 py-10 text-center text-sm text-slate-500 md:flex-row md:px-8 md:text-left">
          <a href="#top" aria-label="Return to the EMBUR homepage">
            <EmburLogo size="small" />
          </a>

          <p>
            © {new Date().getFullYear()} EMBUR. Returning time to local service
            business owners.
          </p>

          <a
            href="#time-back"
            className="font-semibold text-blue-700 transition hover:text-blue-800"
          >
            Get My Time Back
          </a>
        </div>
      </footer>
    </main>
  );
}