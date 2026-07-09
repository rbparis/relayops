"use client";

import { useState } from "react";
import { activity, leads, metrics, settings } from "@/data/demoData";
import type { Lead } from "@/types";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";


export default function AppShellPreview() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [startMyDayOpen, setStartMyDayOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const navItems = [
    "🏠 Dashboard",
    "👥 Customers",
    "💬 Conversations",
    "📊 Reports",
    "⚙️ Settings",
  ];

  function openPage(page: string) {
    setActivePage(page);
    setStartMyDayOpen(false);
    setSelectedLead(null);
  }

  function goToCustomers() {
    openPage("Customers");
  }

  return (
    <section className="max-w-7xl mx-auto px-8 py-20">
      <div className="rounded-3xl border bg-white shadow-2xl overflow-hidden">
        <div className="grid lg:grid-cols-[260px_1fr] min-h-[760px]">
          <aside className="bg-slate-950 text-white p-6">
            <div className="text-2xl font-bold flex items-center gap-3">
              <span>🔥</span>
              <span>EMBUR</span>
            </div>

            <nav className="mt-10 space-y-3">
              {navItems.map((item) => {
                const page = item.replace(/^[^ ]+ /, "");

                return (
                  <button
                    key={item}
                    onClick={() => openPage(page)}
                    className={`w-full text-left rounded-xl px-4 py-3 transition ${
                      activePage === page && !selectedLead && !startMyDayOpen
                        ? "bg-white text-slate-950"
                        : "text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </nav>
          </aside>

          <main className="bg-slate-50 p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-700">
                  {startMyDayOpen
                    ? "Start My Day"
                    : selectedLead
                    ? "Lead Details"
                    : activePage}
                </p>

                <h2 className="text-3xl font-bold">
                  {startMyDayOpen
                    ? "Let's get today handled."
                    : selectedLead
                    ? selectedLead.name
                    : activePage === "Dashboard"
                    ? "Good morning, Mike."
                    : activePage}
                </h2>
              </div>

              <button
                onClick={() => {
                  setStartMyDayOpen(true);
                  setStep(0);
                  setSelectedLead(null);
                }}
                className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 transition"
              >
                ▶ Start My Day
              </button>
            </div>

            {startMyDayOpen ? (
              <StartMyDayFlow
                step={step}
                setStep={setStep}
                close={() => setStartMyDayOpen(false)}
              />
            ) : selectedLead ? (
              <LeadDetailScreen
                lead={selectedLead}
                back={() => setSelectedLead(null)}
              />
            ) : (
              <>
                {activePage === "Dashboard" && (
                  <DashboardScreen goToCustomers={goToCustomers} />
                )}
                {activePage === "Customers" && (
                  <CustomersScreen selectLead={setSelectedLead} />
                )}
                {activePage === "Conversations" && <ConversationsScreen />}
                {activePage === "Reports" && <ReportsScreen />}
                {activePage === "Settings" && <SettingsScreen />}
              </>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}

function StartMyDayFlow({
  step,
  setStep,
  close,
}: {
  step: number;
  setStep: (step: number) => void;
  close: () => void;
}) {
  const steps = [
    {
      label: "Morning Brief",
      title: "Good morning, Mike.",
      body: "Yesterday YOU recovered $3,250 that would have otherwise been lost.",
      action: "Review First Priority",
    },
    {
      label: "Priority #1",
      title: "Call Mike Brown",
      body: "Emergency AC Repair • Waiting 11 hours • Potential $1,250 job.",
      action: "Mark Complete",
    },
    {
      label: "Priority Complete",
      title: "Nice. One priority handled.",
      body: "Mike Brown has been marked as contacted. One customer still needs your attention.",
      action: "Next Priority",
    },
    {
      label: "Caught Up",
      title: "You're caught up.",
      body: "Your highest-priority customer issues are handled. Have a great day.",
      action: "Return to Dashboard",
    },
  ];

  const current = steps[step];

  return (
    <div className="mt-8 rounded-3xl border bg-white p-10 shadow-xl">
      <p className="text-sm font-bold text-blue-700">{current.label}</p>
      <h3 className="mt-4 text-5xl font-bold">{current.title}</h3>
      <p className="mt-6 max-w-2xl text-xl text-slate-600">{current.body}</p>

      {step === 1 && (
        <div className="mt-8 flex gap-4">
          <button className="rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white">
            📞 Call Customer
          </button>
          <button className="rounded-xl border px-6 py-4 font-semibold">
            ✉️ Send Text
          </button>
        </div>
      )}

      <div className="mt-10 flex gap-4">
        <button
          onClick={() => {
            if (step === steps.length - 1) close();
            else setStep(step + 1);
          }}
          className="rounded-xl bg-slate-950 px-6 py-4 font-semibold text-white hover:bg-slate-800 transition"
        >
          {current.action}
        </button>

        <button
          onClick={close}
          className="rounded-xl border px-6 py-4 font-semibold hover:bg-slate-50 transition"
        >
          Exit
        </button>
      </div>
    </div>
  );
}

function DashboardScreen({ goToCustomers }: { goToCustomers: () => void }) {
  return (
    <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_360px]">
      <div>
        <div className="rounded-3xl bg-gradient-to-br from-slate-950 to-blue-950 p-8 text-white">
          <p className="text-blue-200 font-semibold">
            Today&apos;s Operations Brief
          </p>

          <h3 className="mt-4 text-5xl font-bold">$3,250</h3>

          <p className="mt-3 text-slate-300">
            Yesterday YOU recovered revenue that would have otherwise been lost.
          </p>

          <div className="mt-8 rounded-2xl bg-white p-6 text-slate-900">
            <p className="text-sm font-bold text-red-600">FIRST PRIORITY</p>
            <h4 className="mt-2 text-2xl font-bold">Call Mike Brown</h4>
            <p className="mt-2 text-slate-600">
              Emergency AC Repair • Waiting 11 hours • Potential $1,250 job
            </p>

            <button
              onClick={goToCustomers}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 transition"
            >
              View Priority Leads
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl border bg-white p-6">
              <p className="text-3xl font-bold">{metric.value}</p>
              <p className="mt-2 text-sm text-slate-500">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>

      <LiveActivityPanel />
    </div>
  );
}

function LiveActivityPanel() {
  const liveItems = [
    {
      time: "9:42 AM",
      icon: "✅",
      title: "John Smith booked.",
      detail: "Emergency AC repair added to today’s schedule.",
    },
    {
      time: "9:51 AM",
      icon: "📱",
      title: "Sarah Johnson replied.",
      detail: "Install estimate follow-up received.",
    },
    {
      time: "10:03 AM",
      icon: "📞",
      title: "Missed call recovered.",
      detail: "New customer information captured automatically.",
    },
    {
      time: "10:11 AM",
      icon: "⭐",
      title: "Review request sent.",
      detail: "Completed job follow-up delivered.",
    },
    {
      time: "10:16 AM",
      icon: "💵",
      title: "Estimated revenue updated.",
      detail: "+$950 added to recovered opportunity value.",
    },
  ];

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-700">LIVE</p>
          <h3 className="text-xl font-bold">Activity Feed</h3>
        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          Active
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {liveItems.map((item) => (
          <div key={item.time} className="rounded-2xl bg-slate-50 p-4">
            <div className="flex gap-3">
              <div className="text-xl">{item.icon}</div>
              <div>
                <p className="text-xs font-semibold text-slate-400">
                  {item.time}
                </p>
                <p className="mt-1 font-semibold">{item.title}</p>
                <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CustomersScreen({
  selectLead,
}: {
  selectLead: (lead: Lead) => void;
}) {
  return (
    <div className="mt-8 rounded-2xl border bg-white p-6">
      <h3 className="text-xl font-bold">Customers</h3>

      <div className="mt-5 space-y-4">
        {leads.map((lead) => (
          <button
            key={lead.id}
            onClick={() => selectLead(lead)}
            className="w-full text-left rounded-xl bg-slate-50 p-4 hover:bg-blue-50 transition"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold">{lead.name}</p>
                <p className="text-sm text-slate-500">{lead.service}</p>
                <p className="mt-2 text-sm font-semibold text-green-700">
                  Estimated value: {lead.value}
                </p>
              </div>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                {lead.status}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function LeadDetailScreen({
  lead,
  back,
}: {
  lead: Lead;
  back: () => void;
}) {
  return (
    <div className="mt-8 rounded-3xl border bg-white p-8 shadow-xl">
      <button
        onClick={back}
        className="mb-6 rounded-xl border px-4 py-2 font-semibold hover:bg-slate-50 transition"
      >
        ← Back to Customers
      </button>

      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-sm font-semibold text-blue-700">Lead Profile</p>
          <h3 className="mt-2 text-4xl font-bold">{lead.name}</h3>
          <p className="mt-2 text-lg text-slate-600">{lead.service}</p>
        </div>

        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
          {lead.status}
        </span>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Phone</p>
          <p className="mt-2 font-semibold">(555) 555-1212</p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Estimated Value</p>
          <p className="mt-2 font-semibold">{lead.value}</p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Address</p>
          <p className="mt-2 font-semibold">123 Main Street</p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Priority</p>
          <p className="mt-2 font-semibold">
            {lead.name === "Mike Brown" ? "High" : "Normal"}
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border p-6">
        <h4 className="font-bold text-lg">Timeline</h4>

        <div className="mt-5 space-y-4">
          {[
            "Customer contacted business.",
            "EMBUR captured lead information.",
            "Office was notified automatically.",
            "Follow-up action was recommended.",
          ].map((event) => (
            <div key={event} className="flex gap-3">
              <div className="mt-2 h-2 w-2 rounded-full bg-blue-600" />
              <p className="text-slate-600">{event}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button className="rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white hover:bg-blue-700 transition">
          📞 Call Customer
        </button>

        <button className="rounded-xl border px-6 py-4 font-semibold hover:bg-slate-50 transition">
          ✉️ Send Text
        </button>
      </div>
    </div>
  );
}

function ConversationsScreen() {
  return (
    <div className="mt-8 rounded-2xl border bg-white p-6">
      <h3 className="text-xl font-bold">Conversations</h3>

      <div className="mt-6 space-y-4">
        <div className="max-w-md rounded-2xl bg-slate-100 p-4">
          My AC stopped working. Are you open?
        </div>

        <div className="ml-auto max-w-md rounded-2xl bg-blue-600 p-4 text-white">
          I&apos;m sorry you&apos;re dealing with that. What&apos;s your address?
        </div>

        <div className="max-w-md rounded-2xl bg-slate-100 p-4">
          123 Main Street.
        </div>

        <div className="ml-auto max-w-md rounded-2xl bg-blue-600 p-4 text-white">
          Thank you. Your request was captured and the office has been notified.
        </div>
      </div>
    </div>
  );
}

function ReportsScreen() {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-3">
      <div className="rounded-2xl border bg-white p-6">
        <p className="text-sm text-slate-500">Recovered This Month</p>
        <p className="mt-3 text-4xl font-bold">$18,400</p>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        <p className="text-sm text-slate-500">Recovery Rate</p>
        <p className="mt-3 text-4xl font-bold">81%</p>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        <p className="text-sm text-slate-500">Avg Response Time</p>
        <p className="mt-3 text-4xl font-bold">18s</p>
      </div>
    </div>
  );
}

function SettingsScreen() {
  return (
    <div className="mt-8 rounded-2xl border bg-white p-6">
      <h3 className="text-xl font-bold">Settings</h3>

      <div className="mt-6 space-y-4">
        {settings.map((setting) => (
          <div key={setting.id} className="rounded-xl bg-slate-50 p-4">
            {setting.label}
          </div>
        ))}
      </div>
    </div>
  );
}