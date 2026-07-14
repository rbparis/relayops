import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import SubscribeButton from "@/components/billing/SubscribeButton";
import EmburLogo from "@/components/brand/EmburLogo";
import { getOrCreateBusinessForOrganization } from "@/lib/currentBusiness";

type BillingPageProps = {
  searchParams: Promise<{
    canceled?: string;
  }>;
};

export default async function BillingPage({
  searchParams,
}: BillingPageProps) {
  const {
    isAuthenticated,
    orgId,
    redirectToSignIn,
  } = await auth();

  if (!isAuthenticated) {
    return redirectToSignIn();
  }

  if (!orgId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <p className="font-semibold text-slate-700">
          Select a company before opening billing.
        </p>
      </main>
    );
  }

  const business =
    await getOrCreateBusinessForOrganization(orgId);

  const { canceled } = await searchParams;

  return (
    <main className="min-h-screen bg-slate-100 px-5 py-10 text-slate-950 md:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between gap-4">
          <EmburLogo size="small" />

          <Link
            href="/app"
            className="text-sm font-bold text-blue-700 hover:text-blue-800"
          >
            ← Return to Workspace
          </Link>
        </div>

        {canceled === "true" && (
          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-900">
            Checkout was canceled. Nothing was charged.
          </div>
        )}

        <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-8 text-white md:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-300">
              EMBUR Pro
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight">
              Give {business.name} its time back.
            </h1>

            <div className="mt-7 flex items-end gap-2">
              <span className="text-5xl font-bold">
                $99
              </span>

              <span className="pb-1 text-slate-300">
                per month
              </span>
            </div>
          </div>

          <div className="p-8 md:p-10">
            <ul className="space-y-4 text-slate-700">
              <li>✓ Private company workspace</li>
              <li>✓ Atlas Intelligence brief</li>
              <li>✓ Customer opportunity ranking</li>
              <li>✓ Customer and conversation tracking</li>
              <li>✓ Business Pulse and Time Ledger</li>
            </ul>

            <div className="mt-8">
              <SubscribeButton />
            </div>

            <p className="mt-5 text-center text-xs leading-relaxed text-slate-500">
              Test mode only. Use a Stripe test card;
              no real charge will occur.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}