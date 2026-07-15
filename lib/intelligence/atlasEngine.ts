import type { Lead } from "@/types";
import { buildAtlasSnapshot } from "./pipeline/snapshot";
import type { AtlasSnapshot } from "./types";

export function createAtlasSnapshot(
  customers: Lead[]
): AtlasSnapshot {
  return buildAtlasSnapshot(customers);
}