import type { Lead } from "@/types";
import { createRecommendations } from "../recommendationEngine";
import type { AtlasRecommendation } from "../types";
import type { AtlasMemory } from "../memory/types";
import { normalizeAtlasMemory } from "../memory/memoryEngine";

export function buildRecommendations(
  customers: Lead[],
  memory?: AtlasMemory | null
): AtlasRecommendation[] {
  const atlasMemory =
    normalizeAtlasMemory(memory);

  return createRecommendations(customers).map(
    (recommendation) => {
      if (
        recommendation.actionType !== "call" ||
        atlasMemory.preferredCommunication ===
          "call"
      ) {
        return recommendation;
      }

      if (
        atlasMemory.preferredCommunication ===
        "text"
      ) {
        return {
          ...recommendation,
          title: recommendation.title.replace(
            /^Call /,
            "Text "
          ),
          actionType: "text",
        };
      }

      return {
        ...recommendation,
        title: recommendation.title.replace(
          /^Call /,
          "Email "
        ),
        actionType: "follow_up",
      };
    }
  );
}