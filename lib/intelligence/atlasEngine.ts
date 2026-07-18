import type { Lead } from "@/types";
import { buildAtlasSnapshot } from "./pipeline/snapshot";
import type { AtlasSnapshot } from "./types";
import type { AtlasMemory } from "./memory/types";

export function createAtlasSnapshot(
  customers: Lead[],
  memory?: AtlasMemory | null
): AtlasSnapshot {
  return buildAtlasSnapshot(
    customers,
    memory
  );
}