"use client";

import { useState } from "react";

export default function SubscribeButton() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  async function startCheckout() {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(
        "/api/billing/checkout",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
        }
      );

      const result = (await response.json()) as {
        success: boolean;
        url?: string;
        message?: string;
      };

      if (
        !response.ok ||
        !result.success ||
        !result.url
      ) {
        throw new Error(
          result.message ??
            "Checkout could not be started."
        );
      }

      window.location.assign(result.url);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Checkout could not be started."
      );

      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={startCheckout}
        disabled={loading}
        className="w-full rounded-xl bg-blue-600 px-6 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading
          ? "Opening secure checkout..."
          : "Start EMBUR Pro — $99/month"}
      </button>

      {errorMessage && (
        <p className="mt-3 text-sm font-semibold text-red-700">
          {errorMessage}
        </p>
      )}
    </div>
  );
}