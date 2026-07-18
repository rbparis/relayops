import type { AtlasMemory } from "@/lib/intelligence/memory/types";
import type { AtlasSnapshot } from "@/lib/intelligence/types";

type AskAtlasResponse = {
  success: boolean;
  answer?: string;
  message?: string;
};

export async function askAtlas(
  question: string,
  snapshot: AtlasSnapshot,
  memory?: AtlasMemory | null
): Promise<string> {
  const response = await fetch(
    "/api/atlas/ask",
    {
      method: "POST",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      cache: "no-store",

      body: JSON.stringify({
        question,
        snapshot,
        memory,
      }),
    }
  );

  const contentType =
    response.headers.get("content-type") ??
    "";

  if (
    !contentType.includes(
      "application/json"
    )
  ) {
    const responseText =
      await response.text();

    console.error(
      "Ask Atlas returned non-JSON:",
      responseText.slice(0, 500)
    );

    throw new Error(
      `Atlas endpoint returned HTTP ${response.status}.`
    );
  }

  const result =
    (await response.json()) as AskAtlasResponse;

  if (
    !response.ok ||
    !result.success ||
    !result.answer
  ) {
    throw new Error(
      result.message ??
        "Atlas could not answer."
    );
  }

  return result.answer;
}