import type { Lead } from "@/types";
import { createRecommendations } from "../recommendationEngine";
import type { AtlasRecommendation } from "../types";

export function buildRecommendations(
  customers: Lead[]
): AtlasRecommendation[] {
  return createRecommendations(customers);
}