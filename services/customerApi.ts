import type { Lead } from "@/types";

type CustomerApiResponse = {
  success: boolean;
  source: string;
  customers: Lead[];
  message?: string;
};

export async function fetchDatabaseCustomers(): Promise<
  Lead[]
> {
  const response = await fetch("/api/demo/customers", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const result =
    (await response.json()) as CustomerApiResponse;

  if (!response.ok || !result.success) {
    throw new Error(
      result.message ??
        "The EMBUR customer database could not be loaded."
    );
  }

  return result.customers;
}