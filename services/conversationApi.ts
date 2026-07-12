export type ConversationDirection =
  | "inbound"
  | "outbound";

export type ConversationMessage = {
  id: string;
  direction: ConversationDirection;
  body: string;
  status: string;
  channel: string;
  time: string;
  createdAt: string;
};

export type ConversationThread = {
  id: string;
  customerName: string;
  service: string;
  customerStatus: string;
  phone: string | null;
  preview: string;
  lastActivity: string;
  needsAttention: boolean;
  messages: ConversationMessage[];
};

type ConversationApiResponse = {
  success: boolean;
  source: string;
  threads: ConversationThread[];
  message?: string;
};

export async function fetchDatabaseConversations(): Promise<
  ConversationThread[]
> {
  const response = await fetch(
    "/api/demo/conversations",
    {
      method: "GET",

      headers: {
        Accept: "application/json",
      },

      cache: "no-store",
    }
  );

  const result =
    (await response.json()) as ConversationApiResponse;

  if (!response.ok || !result.success) {
    throw new Error(
      result.message ??
        "The EMBUR conversation database could not be loaded."
    );
  }

  return result.threads;
}