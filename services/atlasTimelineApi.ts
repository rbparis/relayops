export type AtlasTimelineItem = {
  id: string;

  type:
    | "conversation"
    | "action-approved"
    | "action-skipped"
    | "action-pending";

  title: string;
  description: string;
  customerName: string | null;
  occurredAt: string;
  estimatedValue: number | null;
};

type AtlasTimelineResponse = {
  success: boolean;
  timeline?: AtlasTimelineItem[];
  message?: string;
};

export async function fetchAtlasTimeline(): Promise<
  AtlasTimelineItem[]
> {
  const response = await fetch(
    "/api/atlas/timeline",
    {
      method: "GET",

      headers: {
        Accept: "application/json",
      },

      cache: "no-store",
    }
  );

  const contentType =
    response.headers.get(
      "content-type"
    ) ?? "";

  if (
    !contentType.includes(
      "application/json"
    )
  ) {
    const responseText =
      await response.text();

    console.error(
      "Atlas Timeline returned non-JSON:",
      responseText.slice(0, 500)
    );

    throw new Error(
      `Atlas Timeline returned HTTP ${response.status}.`
    );
  }

  const result =
    (await response.json()) as AtlasTimelineResponse;

  if (
    !response.ok ||
    !result.success ||
    !result.timeline
  ) {
    throw new Error(
      result.message ??
        "Atlas Timeline could not be loaded."
    );
  }

  return result.timeline;
}