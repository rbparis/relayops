import type { AtlasMemory } from "@/lib/intelligence/memory/types";

type AtlasMemoryResponse = {
  success: boolean;
  memory?: AtlasMemory;
  message?: string;
};

async function readResponse(
  response: Response
): Promise<AtlasMemory> {
  const result =
    (await response.json()) as AtlasMemoryResponse;

  if (
    !response.ok ||
    !result.success ||
    !result.memory
  ) {
    throw new Error(
      result.message ??
        "Atlas Memory request failed."
    );
  }

  return result.memory;
}

export async function fetchAtlasMemory(): Promise<AtlasMemory> {
  const response = await fetch(
    "/api/atlas/memory",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  return readResponse(response);
}

export async function updateAtlasMemory(
  memory: AtlasMemory
): Promise<AtlasMemory> {
  const response = await fetch(
    "/api/atlas/memory",
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memory),
    }
  );

  return readResponse(response);
}