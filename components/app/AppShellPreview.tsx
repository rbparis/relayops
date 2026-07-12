"use client";

import {
  useEffect,
  useState,
} from "react";
import type { Lead } from "@/types";
import AppSidebar, {
  type AppPage,
} from "@/components/app/AppSidebar";
import AppHeader from "@/components/app/AppHeader";
import WelcomeOverlay from "@/components/welcome/WelcomeOverlay";
import TodayPage from "@/components/pages/TodayPage";
import CustomersPage from "@/components/pages/CustomersPage";
import CustomerDetailPage from "@/components/pages/CustomerDetailPage";
import ConversationsPage from "@/components/pages/ConversationsPage";
import BusinessPage from "@/components/pages/BusinessPage";
import SettingsPage from "@/components/pages/SettingsPage";
import { getCustomers } from "@/services/customerService";
import { fetchDatabaseCustomers } from "@/services/customerApi";
import {
  fetchDatabaseConversations,
  type ConversationThread,
} from "@/services/conversationApi";
import { getBusinessMetrics } from "@/services/businessService";

const fallbackCustomers = getCustomers();
const businessMetrics = getBusinessMetrics();

type CustomerDataStatus =
  | "loading"
  | "database"
  | "fallback";

type ConversationDataStatus =
  | "loading"
  | "database"
  | "error";

export default function AppShellPreview() {
  const [activePage, setActivePage] =
    useState<AppPage>("Today");

  const [
    selectedCustomer,
    setSelectedCustomer,
  ] = useState<Lead | null>(null);

  const [customers, setCustomers] =
    useState<Lead[]>(
      fallbackCustomers
    );

  const [
    customerDataStatus,
    setCustomerDataStatus,
  ] =
    useState<CustomerDataStatus>(
      "loading"
    );

  const [
    conversationThreads,
    setConversationThreads,
  ] =
    useState<ConversationThread[]>(
      []
    );

  const [
    conversationDataStatus,
    setConversationDataStatus,
  ] =
    useState<ConversationDataStatus>(
      "loading"
    );

  const [
    welcomeOpen,
    setWelcomeOpen,
  ] = useState(false);

  const [
    welcomeStep,
    setWelcomeStep,
  ] = useState(0);

  useEffect(() => {
    let componentIsActive = true;

    async function loadCustomers() {
      try {
        const databaseCustomers =
          await fetchDatabaseCustomers();

        if (!componentIsActive) {
          return;
        }

        if (
          databaseCustomers.length > 0
        ) {
          setCustomers(
            databaseCustomers
          );

          setCustomerDataStatus(
            "database"
          );

          return;
        }

        setCustomers(
          fallbackCustomers
        );

        setCustomerDataStatus(
          "fallback"
        );
      } catch (error) {
        console.error(
          "Using EMBUR demo customer fallback:",
          error
        );

        if (!componentIsActive) {
          return;
        }

        setCustomers(
          fallbackCustomers
        );

        setCustomerDataStatus(
          "fallback"
        );
      }
    }

    async function loadInitialConversations() {
      try {
        const databaseConversations =
          await fetchDatabaseConversations();

        if (!componentIsActive) {
          return;
        }

        setConversationThreads(
          databaseConversations
        );

        setConversationDataStatus(
          "database"
        );
      } catch (error) {
        console.error(
          "Could not load EMBUR conversations:",
          error
        );

        if (!componentIsActive) {
          return;
        }

        setConversationThreads([]);

        setConversationDataStatus(
          "error"
        );
      }
    }

    void loadCustomers();
    void loadInitialConversations();

    return () => {
      componentIsActive = false;
    };
  }, []);

  async function retryConversations() {
    setConversationDataStatus(
      "loading"
    );

    try {
      const databaseConversations =
        await fetchDatabaseConversations();

      setConversationThreads(
        databaseConversations
      );

      setConversationDataStatus(
        "database"
      );
    } catch (error) {
      console.error(
        "Could not reload EMBUR conversations:",
        error
      );

      setConversationThreads([]);

      setConversationDataStatus(
        "error"
      );
    }
  }

  function handlePageChange(
    page: AppPage
  ) {
    setActivePage(page);
    setSelectedCustomer(null);
    closeWelcomeExperience();
  }

  function handleCustomerSelect(
    customer: Lead
  ) {
    setSelectedCustomer(customer);
    setWelcomeOpen(false);
    setWelcomeStep(0);
  }

  function handleCustomerBack() {
    setSelectedCustomer(null);
    setActivePage("Customers");
  }

  function openWelcomeExperience() {
    setWelcomeOpen(true);
    setWelcomeStep(0);
    setSelectedCustomer(null);
  }

  function closeWelcomeExperience() {
    setWelcomeOpen(false);
    setWelcomeStep(0);
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
      <div className="relative overflow-hidden rounded-3xl border bg-white shadow-2xl">
        {welcomeOpen && (
          <WelcomeOverlay
            step={welcomeStep}
            onStart={() =>
              setWelcomeStep(1)
            }
            onNext={() =>
              setWelcomeStep(
                (currentStep) =>
                  Math.min(
                    currentStep + 1,
                    3
                  )
              )
            }
            onClose={
              closeWelcomeExperience
            }
          />
        )}

        <div className="grid min-h-[780px] lg:grid-cols-[260px_minmax(0,1fr)]">
          <AppSidebar
            activePage={activePage}
            onPageChange={
              handlePageChange
            }
          />

          <main className="min-w-0 bg-slate-50 p-5 md:p-8">
            <AppHeader
              activePage={activePage}
              selectedCustomerName={
                selectedCustomer?.name
              }
              onStartMyDay={
                openWelcomeExperience
              }
            />

            <DataSourceNotice
              status={
                customerDataStatus
              }
            />

            {selectedCustomer ? (
              <CustomerDetailPage
                customer={
                  selectedCustomer
                }
                onBack={
                  handleCustomerBack
                }
              />
            ) : (
              <>
                {activePage ===
                  "Today" && (
                  <TodayPage
                    customers={
                      customers
                    }
                    onOpenCustomer={
                      handleCustomerSelect
                    }
                  />
                )}

                {activePage ===
                  "Customers" && (
                  <CustomersPage
                    customers={
                      customers
                    }
                    onCustomerSelect={
                      handleCustomerSelect
                    }
                  />
                )}

                {activePage ===
                  "Conversations" && (
                  <ConversationsPage
                    threads={
                      conversationThreads
                    }
                    status={
                      conversationDataStatus
                    }
                    onRetry={
                      retryConversations
                    }
                  />
                )}

                {activePage ===
                  "Business" && (
                  <BusinessPage
                    metrics={
                      businessMetrics
                    }
                  />
                )}

                {activePage ===
                  "Settings" && (
                  <SettingsPage />
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}

function DataSourceNotice({
  status,
}: {
  status: CustomerDataStatus;
}) {
  if (status === "loading") {
    return (
      <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-slate-400">
        <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />

        Connecting to EMBUR data...
      </div>
    );
  }

  if (status === "fallback") {
    return (
      <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-amber-700">
        <span className="h-2 w-2 rounded-full bg-amber-500" />

        Demo fallback data is active.
      </div>
    );
  }

  return (
    <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-green-700">
      <span className="h-2 w-2 rounded-full bg-green-500" />

      Connected to the EMBUR database.
    </div>
  );
}